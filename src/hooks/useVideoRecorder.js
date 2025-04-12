import { useState, useRef, useEffect } from 'react';
import { storage, db } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const useVideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [error, setError] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  
  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoStream, videoUrl]);

  const startRecording = async () => {
    recordedChunksRef.current = [];
    setError(null);
    
    try {
      // Request access to camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }, 
        audio: true 
      });
      
      setVideoStream(stream);
      
      // Create media recorder
      const options = { mimeType: 'video/webm;codecs=vp8,opus' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'video/webm';
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          delete options.mimeType; // Let browser decide
        }
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      
      // Set up event handlers
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { 
          type: options.mimeType || 'video/webm' 
        });
        const url = URL.createObjectURL(blob);
        
        setVideoBlob(blob);
        setVideoUrl(url);
      };
      
      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event.error);
        setError("Error during recording: " + event.error);
      };
      
      // Start recording
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
      
      return true;
    } catch (err) {
      console.error("Error starting recording:", err);
      setError(`Could not start recording: ${err.message}`);
      return false;
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      
      // Stop all tracks
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      
      return true;
    }
    return false;
  };

  const saveRecording = async (title, emotion, journalText) => {
    if (!videoBlob || !title) {
      setError("Missing video or title");
      return false;
    }
    
    try {
      // Create unique filename
      const filename = `video_${Date.now()}.webm`;
      const storageRef = ref(storage, `videos/${filename}`);
      
      // Upload to Firebase Storage
      await uploadBytes(storageRef, videoBlob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Save metadata to Firestore
      await addDoc(collection(db, 'videos'), {
        title,
        emotion,
        description: journalText,
        videoUrl: downloadURL,
        createdAt: serverTimestamp()
      });
      
      return true;
    } catch (err) {
      console.error("Error saving recording:", err);
      setError(`Failed to save recording: ${err.message}`);
      return false;
    }
  };

  return {
    recording,
    videoStream,
    videoUrl,
    videoBlob,
    error,
    startRecording,
    stopRecording,
    saveRecording
  };
};

export default useVideoRecorder;
