export function checkFileType(file_name) {
  const imageType = ['jpeg', 'jpg', 'png', 'gif'];
  const pdfType = ['pdf'];
  const docType = ['doc', 'docx'];
  const excelType = ['xlsx', 'csv', 'txt', 'xltx'];
  const zipType = ['zip', 'rar'];
  const zipOther = ['apk', 'psd', 'ai', 'sql'];
  const audioType = [
    'avi',
    'mov',
    'webm',
    'mp4',
    'm4p',
    'mpg',
    'mp2',
    'mpeg',
    'mpe',
    'mpv',
    'm4v',
    'svi',
  ];

  const fileNameSplit = file_name?.split('.');
  const fileName = fileNameSplit[fileNameSplit?.length - 1];
  let type = 'file';
  if (imageType.indexOf(fileName) > -1) {
    type = 'image';
  } else if (pdfType.indexOf(fileName) > -1) {
    type = 'pdf';
  } else if (docType.indexOf(fileName) > -1) {
    type = 'word';
  } else if (excelType.indexOf(fileName) > -1) {
    type = 'excel';
  } else if (zipType.indexOf(fileName) > -1) {
    type = 'zip';
  } else if (audioType.indexOf(fileName) > -1) {
    type = 'audio';
  } else if (zipOther.indexOf(fileName) > -1) {
    type = 'other';
  }

  return type;
}

export const convertSize = (sizeBytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;

  while (sizeBytes >= 1024 && index < units.length - 1) {
    sizeBytes /= 1024;
    index++;
  }

  return `${sizeBytes.toFixed(0)} ${units[index]}`;
};

export const downloadFile = (linkSource: string, fileNameSource?: string) => {
  const downloadLink = document.createElement('a');
  const fileName = fileNameSource || 'fileName';

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};
