import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UploadModal from '../components/FileUploader';
import styles from '../styles/main.module.css'; // ✅ styles 폴더로 경로 수정

export default function Main() {
  const [folders, setFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const goToFileList = (folder) => {
    const query = new URLSearchParams({
      name: folder.name,
      description: folder.description || '',
      file: folder.filename || '',
    }).toString();
    router.push(`/filelist?${query}`);
  };

  const handleCreateFolder = (newFolder) => {
    if (folders.length < 4) {
      setFolders([...folders, newFolder]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img src="/image/upup.png" alt="배경" className={styles.backgroundImage} />

      <div className={styles.contentBox}>
        <h2 className={styles.title}>파일을 업로드 해주세요!</h2>

        <div className={styles.grid}>
          {folders.map((folder, index) => (
            <div
              key={index}
              className={styles.folder}
              onClick={() => goToFileList(folder)}
            >
              <img src="/image/folder-icon.png" alt="폴더" />
              <p>{folder.name}</p>
            </div>
          ))}
          {folders.length < 4 && (
            <div
              className={styles.addButton}
              onClick={() => setShowModal(true)}
            >
              +
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateFolder}
        />
      )}
    </div>
  );
}
