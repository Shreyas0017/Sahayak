import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import {
  User,
  GeneratedContent,
  DifferentiatedMaterial,
  KnowledgeQuery,
  VisualAid,
  LessonPlan,
  EducationalGame,
  AudioAssessment
} from '../types';

// 🔄 Timestamp conversion helper
const convertTimestamp = (data: DocumentData) => {
  const converted = { ...data };
  Object.keys(converted).forEach(key => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate();
    }
  });
  return converted;
};

// ✅ FIXED: Create user with UID as document ID
export const createUser = async (userData: User) => {
  const now = new Date();
  const userRef = doc(db, 'users', userData.id);
  await setDoc(userRef, {
    email: userData.email,
    name: userData.name,
    school: userData.school || '',
    language: userData.language || '',
    createdAt: now,
    updatedAt: now
  });
};

// 🔍 Fetch user by UID
export const getUser = async (userId: string): Promise<User | null> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...convertTimestamp(docSnap.data()) } as User;
  }
  return null;
};

// 🔄 Update user data
export const updateUser = async (userId: string, userData: Partial<User>) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    ...userData,
    updatedAt: new Date()
  });
};

// Content saving and retrieval
export const saveGeneratedContent = async (content: Omit<GeneratedContent, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const docRef = await addDoc(collection(db, 'generatedContent'), {
    ...content,
    createdAt: now,
    updatedAt: now
  });
  return docRef.id;
};

export const getUserGeneratedContent = async (userId: string, limitCount = 20): Promise<GeneratedContent[]> => {
  const q = query(
    collection(db, 'generatedContent'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamp(doc.data())
  })) as GeneratedContent[];
};

export const deleteGeneratedContent = async (contentId: string) => {
  await deleteDoc(doc(db, 'generatedContent', contentId));
};

// Differentiated Materials
export const saveDifferentiatedMaterial = async (material: Omit<DifferentiatedMaterial, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const docRef = await addDoc(collection(db, 'differentiatedMaterials'), {
    ...material,
    createdAt: now,
    updatedAt: now
  });
  return docRef.id;
};

export const getUserDifferentiatedMaterials = async (userId: string): Promise<DifferentiatedMaterial[]> => {
  const q = query(
    collection(db, 'differentiatedMaterials'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamp(doc.data())
  })) as DifferentiatedMaterial[];
};

// Knowledge Queries
export const saveKnowledgeQuery = async (queryData: Omit<KnowledgeQuery, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'knowledgeQueries'), {
    ...queryData,
    createdAt: new Date()
  });
  return docRef.id;
};

export const getUserKnowledgeQueries = async (userId: string, limitCount = 50): Promise<KnowledgeQuery[]> => {
  const q = query(
    collection(db, 'knowledgeQueries'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamp(doc.data())
  })) as KnowledgeQuery[];
};

// Visual Aids
export const saveVisualAid = async (visualAid: Omit<VisualAid, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const docRef = await addDoc(collection(db, 'visualAids'), {
    ...visualAid,
    createdAt: now,
    updatedAt: now
  });
  return docRef.id;
};

export const getUserVisualAids = async (userId: string): Promise<VisualAid[]> => {
  const q = query(
    collection(db, 'visualAids'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamp(doc.data())
  })) as VisualAid[];
};

// Lesson Plans
export const saveLessonPlan = async (lessonPlan: Omit<LessonPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const docRef = await addDoc(collection(db, 'lessonPlans'), {
    ...lessonPlan,
    createdAt: now,
    updatedAt: now
  });
  return docRef.id;
};

export const getUserLessonPlans = async (userId: string): Promise<LessonPlan[]> => {
  const q = query(
    collection(db, 'lessonPlans'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamp(doc.data())
  })) as LessonPlan[];
};

// Educational Games
export const saveEducationalGame = async (game: Omit<EducationalGame, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const docRef = await addDoc(collection(db, 'educationalGames'), {
    ...game,
    createdAt: now,
    updatedAt: now
  });
  return docRef.id;
};

export const getUserEducationalGames = async (userId: string): Promise<EducationalGame[]> => {
  const q = query(
    collection(db, 'educationalGames'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamp(doc.data())
  })) as EducationalGame[];
};

// Audio Assessments
export const saveAudioAssessment = async (assessment: Omit<AudioAssessment, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'audioAssessments'), {
    ...assessment,
    createdAt: new Date()
  });
  return docRef.id;
};

export const getUserAudioAssessments = async (userId: string): Promise<AudioAssessment[]> => {
  const q = query(
    collection(db, 'audioAssessments'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamp(doc.data())
  })) as AudioAssessment[];
};

// Dashboard Stats
export const getDashboardStats = async (userId: string) => {
  const [
    contentDocs,
    materialsDocs,
    lessonsDocs,
    gamesDocs,
    assessmentsDocs
  ] = await Promise.all([
    getDocs(query(collection(db, 'generatedContent'), where('userId', '==', userId))),
    getDocs(query(collection(db, 'differentiatedMaterials'), where('userId', '==', userId))),
    getDocs(query(collection(db, 'lessonPlans'), where('userId', '==', userId))),
    getDocs(query(collection(db, 'educationalGames'), where('userId', '==', userId))),
    getDocs(query(collection(db, 'audioAssessments'), where('userId', '==', userId)))
  ]);

  return {
    contentCreated: contentDocs.size,
    materialsGenerated: materialsDocs.size,
    lessonsPlanned: lessonsDocs.size,
    gamesCreated: gamesDocs.size,
    assessmentsConducted: assessmentsDocs.size,
    totalActivities: contentDocs.size + materialsDocs.size + lessonsDocs.size + gamesDocs.size + assessmentsDocs.size
  };
};

// Dashboard Activity Feed
export const getRecentActivity = async (userId: string, limitCount = 10) => {
  const activities: any[] = [];

  const contentQuery = query(
    collection(db, 'generatedContent'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(5)
  );
  const contentDocs = await getDocs(contentQuery);
  contentDocs.forEach(doc => {
    const data = convertTimestamp(doc.data());
    activities.push({
      id: doc.id,
      type: 'content',
      title: `Created ${data.type}: ${data.title}`,
      timestamp: data.createdAt,
      icon: 'FileText'
    });
  });

  const lessonQuery = query(
    collection(db, 'lessonPlans'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(3)
  );
  const lessonDocs = await getDocs(lessonQuery);
  lessonDocs.forEach(doc => {
    const data = convertTimestamp(doc.data());
    activities.push({
      id: doc.id,
      type: 'lesson',
      title: `Planned lesson: ${data.subject} - ${data.topic}`,
      timestamp: data.createdAt,
      icon: 'Calendar'
    });
  });

  return activities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limitCount);
};
