import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import UploadModal from "../components/FileUploader";
import styles from "../styles/main.module.css";
import Footer from "../components/Footer";

export default function Main() {
  const [folders, setFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // 로컬스토리지에서 폴더 정보 로드
  useEffect(() => {
    const stored = localStorage.getItem("folders");
    if (stored) {
      try {
        setFolders(JSON.parse(stored));
      } catch {
        setFolders([]);
      }
    }
  }, []);

  // 폴더 목록이 변경될 때마다 저장
  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const goToFileList = (folder) => {
    const query = new URLSearchParams({
      name: folder.name,
      description: folder.description || "",
      file: folder.filename || "", // 해시 포함 파일 이름
      original_filename: folder.original_filename || folder.filename || "", // 원본 파일 이름
    }).toString();
    router.push(`/FileList?${query}`);
  };

  const handleCreateFolder = (newFolder) => {
    if (folders.length < 9) {
      setFolders([...folders, newFolder]);
    }
  };

  const removeFolder = (indexToRemove, event) => {
    event.stopPropagation(); // 부모 요소로의 이벤트 전파(버블링)를 막습니다.
    const folderToRemove = folders[indexToRemove];
    if (
      window.confirm(`'${folderToRemove.name}' 폴더를 정말 삭제하시겠습니까?`)
    ) {
      const updatedFolders = folders.filter(
        (_, index) => index !== indexToRemove
      );
      setFolders(updatedFolders);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Learning Mate</h1>
        <p className={styles.heroSubtitle}>
          다양한 학습 자료를 업로드하고 퀴즈를 풀면서 성장하세요!
        </p>
        <div className={styles.heroButtons}>
          <button
            className={styles.createButton}
            onClick={() => setShowModal(true)}
          >
            + 폴더 생성
          </button>
          {/*<button className={styles.mockButton}>내 폴더</button>*/}
        </div>
      </div>

      <div className={styles.grayBackground}>
        <div className={styles.folderHeaderOnly}>
          <h3>생성된 폴더</h3>
          <p>생성된 폴더를 확인하고 학습을 시작해보세요!</p>
        </div>

        {folders.length === 0 ? (
          <div className={styles.emptyState}>
            <img
              src="/image/ks_logo2.png"
              alt="아직 폴더가 없습니다"
              className={styles.emptyImage}
            />
          </div>
        ) : (
          <div className={styles.folderSection}>
            <div
              className={`${styles.folderList} ${
                folders.length > 0 && folders.length % 12 === 0
                  ? styles["columns-4"]
                  : folders.length > 0 && folders.length % 3 === 0
                  ? styles["columns-3"]
                  : ""
              }`.trim()}
            >
              {folders.map((folder, index) => (
                <div
                  key={index}
                  className={styles.folderCard}
                  onClick={() => goToFileList(folder)}
                >
                  <h4>{folder.name}</h4>
                  <p>{folder.description || "설명이 없습니다."}</p>
                  <span>생성일: {new Date().toISOString().split("T")[0]}</span>
                  <button
                    className={styles.deleteButton} // styles.deleteButton CSS 클래스를 만들어주세요.
                    onClick={(e) => removeFolder(index, e)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateFolder}
        />
      )}
    </div>
  );
}
