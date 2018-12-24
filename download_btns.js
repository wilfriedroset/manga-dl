
((d) => {
    d.addEventListener('DOMContentLoaded', () => {
        /** global: repoUrl */
        if(typeof repoUrl == 'undefined')
        {
            // example: https://api.github.com/repos/yuru-yuri/manga-dl/releases/latest
            return;
        }
        fetch(repoUrl)
            .then(r => r.json())
            .then((r) => {
                const links = d.querySelector('#download-links');
                const tar = links.querySelector('.tar');
                const zip = links.querySelector('.zip');

                tar.setAttribute('href', r.tarball_url);
                tar.setAttribute('active', 'true');
                zip.setAttribute('href', r.zipball_url);
                zip.setAttribute('active', 'true');
            });
        const ul = d.querySelector('#supported-list');
        if(!ul)
        {
            return;
        }
        fetch('./providers.json')
            .then(r => r.json())
            .then((r) => {
                let html = '', m = 0, done = 0;
                for(let i in r) {
                    if (!r.hasOwnProperty(i)) continue;
                    m+=1;
                    html += '<li><input id="I' + m + '" type="checkbox" ' +
                        (r[i][1] ? 'checked="" ' : '') +
                        'disabled=""><label for="I' + m + '"></label><span>' +
                        '<a target="_blank" href="' +
                        r[i][0] + '">' +
                        r[i][0] + '</a> ' +
                        r[i][2] + '</span></li>';
                    done += r[i][1] === 1 ? 1 : 0;
                }
                ul.innerHTML = html + ('<!-- ' + r.length + ' ( ' + done + ' ) -->');
            });
    });
})(document);
