// 파일을 열 때는 파일 ID를 기반으로, 
// 백엔드에서 해당 파일을 찾아 반환하는 API 엔드포인트를 호출

// /filelist?name=컴퓨터구조론&description=수업자료&id=3&file=자료.pdf 백엔드에 파일저장시에 브라우저 정상 출력

'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/filelist.module.css';

export default function FileList() {
  const searchParams = useSearchParams();
  const folderName = searchParams.get('name') || '폴더 이름 없음';
  const fileName = searchParams.get('file') || '파일 없음';
  const description = searchParams.get('description') || '설명 없음';
  const fileId = searchParams.get('id'); // ✅ fileId도 쿼리로 받아야 함

  const [isLoading, setIsLoading] = useState(false);

  const handleOpenFile = async () => {
    if (!fileId) {
      alert('파일 ID가 없어 파일을 열 수 없습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://3.148.139.172:8000/file/${fileId}`);
      if (!response.ok) {
        throw new Error('파일 불러오기에 실패했습니다.');
      }

      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    } catch (err) {
      console.error('파일 열기 오류:', err);
      alert('파일 열기 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.header}>{folderName}</div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>번호</th>
              <th className={styles.th}>제목</th>
              <th className={styles.th}>작업</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.td}>1</td>
              <td className={styles.td}>
                <strong>{fileName}</strong>
                <div style={{ fontSize: '12px', color: '#777' }}>{description}</div>
              </td>
              <td className={styles.td}>
                <button className={styles.grayButton} onClick={handleOpenFile} disabled={isLoading}>
                  {isLoading ? '로딩 중...' : '파일 열기'}
                </button>
                <button className={styles.yellowButton}>퀴즈 생성</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
