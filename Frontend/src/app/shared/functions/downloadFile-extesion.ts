export function downloadFileResponse(response: any, fileName: string) {
  let dataType = "application/octet-stream";//response.type;
  let binaryData = [];
  binaryData.push(response);
  let downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
  if (fileName)
    //{
    downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  //}else{
  //  const fileURL = URL.createObjectURL(response);
  //  window.open(fileURL, '_blank');
  //}



}
