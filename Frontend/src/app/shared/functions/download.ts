export function DownloadFile(data: Blob, name: string): void {
    // const blob: Blob = new Blob([data.trim()], { type: 'text/plain' });

    const e: MouseEvent = document.createEvent('MouseEvents');
    const a: HTMLAnchorElement = document.createElement('a');

    a.download = name;
    a.href = window.URL.createObjectURL(data);
    a.dataset.downloadurl = [data.type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}
