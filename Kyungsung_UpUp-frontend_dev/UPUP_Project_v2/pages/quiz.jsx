// app-ui/pages/quiz.jsx
'use client';

import QuizUI from '../components/QuizUI';
import styles from '../styles/quiz.module.css'; // 스타일 추가

export default function QuizPage() {
  return (
    <div className={styles.quizPageWrapper}>
      <QuizUI />        {/*QuizUI.jsx 받아와서 렌더링*/}
    </div>
  );
}


