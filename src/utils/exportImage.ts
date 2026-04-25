import html2canvas from 'html2canvas';

export async function exportToPng(
  element: HTMLElement,
  fileName: string = 'kkurim-poster'
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      width: 1080,
      height: 1080,
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    // Blob으로 변환
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });

    // 다운로드
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export image:', error);
    throw error;
  }
}

export async function getImageDataUrl(element: HTMLElement): Promise<string> {
  const canvas = await html2canvas(element, {
    width: 1080,
    height: 1080,
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  return canvas.toDataURL('image/png');
}
