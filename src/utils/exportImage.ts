import html2canvas from 'html2canvas';

export async function exportToPng(
  element: HTMLElement,
  fileName: string = 'kkurim-poster'
): Promise<void> {
  try {
    // 요소의 실제 크기를 기반으로 캡처
    const rect = element.getBoundingClientRect();

    const canvas = await html2canvas(element, {
      scale: 2,  // 고해상도를 위해 2배 스케일
      useCORS: true,
      backgroundColor: '#FDF9F5',  // 배경색 명시
      logging: false,
      width: rect.width,
      height: rect.height,
      scrollX: 0,
      scrollY: 0,
      windowWidth: rect.width,
      windowHeight: rect.height,
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
  const rect = element.getBoundingClientRect();

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FDF9F5',
    logging: false,
    width: rect.width,
    height: rect.height,
    scrollX: 0,
    scrollY: 0,
    windowWidth: rect.width,
    windowHeight: rect.height,
  });

  return canvas.toDataURL('image/png');
}
