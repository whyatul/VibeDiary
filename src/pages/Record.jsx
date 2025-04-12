import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaTimes, FaVideo, FaStop, FaSave, FaCircle, FaInfoCircle } from 'react-icons/fa';
import useVideoRecorder from '../hooks/useVideoRecorder';

function Record() {
  const navigate = useNavigate();
  const { recording, videoStream, videoUrl, error, startRecording, stopRecording, saveRecording } = useVideoRecorder();
  const [title, setTitle] = useState('');
  const [emotion, setEmotion] = useState('Happy');
  const [journalText, setJournalText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);

  const handleStartRecording = async () => {
    if (!title.trim()) {
      alert('Please enter a title before recording.');
      return;
    }
    
    await startRecording();
    setShowPreview(true);
  };

  const handleStopRecording = () => {
    stopRecording();
    setShowPreview(false);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a valid title.');
      return;
    }
    
    const success = await saveRecording(title, emotion, journalText);
    if (success) {
      setIsSaved(true);
      setTimeout(() => {
        navigate('/history');
      }, 1500);
    }
  };

  // Connect the video stream to the video element
  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  // Set the recorded video source
  useEffect(() => {
    if (recordedVideoRef.current && videoUrl && !recording) {
      recordedVideoRef.current.src = videoUrl;
    }
  }, [videoUrl, recording]);

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Record a Journal Entry</h1>
        <button 
          className="d-flex align-items-center"
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-accent-fg)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <FaArrowLeft className="me-2" size={12} /> Back to Home
        </button>
      </div>

      {error && (
        <Alert 
          variant="danger" 
          className="mb-4"
          style={{
            backgroundColor: 'var(--color-scale-red-1)',
            color: 'var(--color-danger-fg)',
            borderColor: 'var(--color-scale-red-2)',
            borderRadius: '6px',
            padding: '12px 16px'
          }}
        >
          <div className="d-flex align-items-center">
            <FaInfoCircle className="me-2" />
            {error}
          </div>
        </Alert>
      )}

      <Card className="mb-4" style={{
        borderRadius: '6px',
        border: '1px solid var(--color-border-default)',
        boxShadow: '0 1px 0 rgba(27, 31, 36, 0.04)'
      }}>
        <Card.Body className="p-4">
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            borderBottom: '1px solid var(--color-border-muted)', 
            paddingBottom: '8px',
            marginBottom: '16px'
          }}>
            Journal Details
          </h2>
          
          <div className="mb-3">
            <label htmlFor="title" style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '600'
            }}>
              Title (required)
            </label>
            <input
              id="title"
              className="form-control"
              type="text"
              placeholder="Give your journal entry a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                padding: '5px 12px',
                fontSize: '14px',
                lineHeight: '20px',
                borderRadius: '6px',
                border: '1px solid var(--color-border-default)'
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="journal" style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '600'
            }}>
              Write your thoughts (optional)
            </label>
            <textarea
              id="journal"
              className="form-control"
              rows="4"
              placeholder="What's on your mind today?"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              style={{
                padding: '5px 12px',
                fontSize: '14px',
                lineHeight: '1.5',
                borderRadius: '6px',
                border: '1px solid var(--color-border-default)',
                minHeight: '100px'
              }}
            />
          </div>
        </Card.Body>
      </Card>

      <Card style={{
        borderRadius: '6px',
        border: '1px solid var(--color-border-default)',
        boxShadow: '0 1px 0 rgba(27, 31, 36, 0.04)'
      }}>
        <Card.Body className="p-4">
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            borderBottom: '1px solid var(--color-border-muted)', 
            paddingBottom: '8px',
            marginBottom: '16px'
          }}>
            Recording Controls
          </h2>
          
          <div className="d-flex align-items-center mb-4">
            <div className="d-flex align-items-center" style={{
              backgroundColor: recording ? 'rgba(207, 34, 46, 0.1)' : 'var(--color-bg-subtle)',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px'
            }}>
              {recording ? (
                <FaCircle className="me-2" style={{ 
                  color: 'var(--color-danger-fg)',
                  animation: 'pulse 1.5s infinite',
                  fontSize: '10px'
                }} />
              ) : (
                <div className="me-2" style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-scale-gray-4)',
                }}></div>
              )}
              <span style={{ color: recording ? 'var(--color-danger-fg)' : 'var(--color-fg-muted)' }}>
                {recording ? 'Recording in progress...' : 'Not recording'}
              </span>
            </div>
          </div>
          
          <div className="d-flex gap-2">
            <button 
              onClick={handleStartRecording}
              disabled={recording}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-accent-fg)',
                color: 'white',
                border: 'none',
                padding: '5px 16px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '6px',
                cursor: recording ? 'not-allowed' : 'pointer',
                opacity: recording ? 0.7 : 1
              }}
            >
              <FaVideo className="me-2" /> Start Recording
            </button>
            <button 
              onClick={handleStopRecording}
              disabled={!recording}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-danger-fg)',
                color: 'white',
                border: 'none',
                padding: '5px 16px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '6px',
                cursor: !recording ? 'not-allowed' : 'pointer',
                opacity: !recording ? 0.7 : 1
              }}
            >
              <FaStop className="me-2" /> Stop Recording
            </button>
            <button 
              onClick={handleSave}
              disabled={!videoUrl || isSaved}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-success-fg)',
                color: 'white',
                border: 'none',
                padding: '5px 16px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '6px',
                cursor: (!videoUrl || isSaved) ? 'not-allowed' : 'pointer',
                opacity: (!videoUrl || isSaved) ? 0.7 : 1
              }}
            >
              <FaSave className="me-2" /> {isSaved ? 'Saved!' : 'Save Journal'}
            </button>
          </div>
        </Card.Body>
      </Card>

      {/* Video Preview Modal with GitHub style */}
      {showPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(27, 31, 36, 0.5)',
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: 'var(--color-bg-canvas)',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(140, 149, 159, 0.2)',
            width: '90%',
            maxWidth: '800px',
          }}>
            <div style={{
              padding: '16px',
              borderBottom: '1px solid var(--color-border-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
              }}>Recording Preview</h3>
              <button 
                onClick={handleStopRecording}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <FaTimes size={16} style={{ color: 'var(--color-fg-muted)' }} />
              </button>
            </div>
            
            <div style={{ padding: '16px' }}>
              <div style={{
                backgroundColor: '#000',
                borderRadius: '6px',
                overflow: 'hidden',
                aspectRatio: '16/9',
              }}>
                {recording ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : videoUrl ? (
                  <video 
                    ref={recordedVideoRef}
                    controls
                    autoPlay
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <div style={{
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    No video available
                  </div>
                )}
              </div>
            </div>
            
            <div style={{
              padding: '16px',
              borderTop: '1px solid var(--color-border-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {recording ? (
                <>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <FaCircle size={10} color="var(--color-danger-fg)" className="me-2" style={{
                      animation: 'pulse 1.5s infinite'
                    }} />
                    <span>Recording...</span>
                  </div>
                  <button 
                    onClick={handleStopRecording}
                    style={{
                      backgroundColor: 'var(--color-danger-fg)',
                      color: 'white',
                      border: 'none',
                      padding: '5px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaStop className="me-2" /> Stop Recording
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleStartRecording}
                    style={{
                      backgroundColor: 'var(--color-bg-subtle)',
                      color: 'var(--color-fg-default)',
                      border: '1px solid var(--color-border-default)',
                      padding: '5px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaVideo className="me-2" /> Record Again
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaved}
                    style={{
                      backgroundColor: 'var(--color-success-fg)',
                      color: 'white',
                      border: 'none',
                      padding: '5px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      borderRadius: '6px',
                      cursor: isSaved ? 'not-allowed' : 'pointer',
                      opacity: isSaved ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaSave className="me-2" /> {isSaved ? 'Saved!' : 'Save Journal'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '24px',
        padding: '16px',
        borderRadius: '6px',
        backgroundColor: 'var(--color-bg-subtle)',
        border: '1px solid var(--color-border-muted)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '12px',
          color: 'var(--color-fg-default)'
        }}>
          Tips for effective video journaling:
        </h3>
        <ul style={{ color: 'var(--color-fg-muted)' }}>
          <li>Find a quiet space with good lighting</li>
          <li>Speak naturally as if talking to a friend</li>
          <li>Don't worry about mistakes - this is for you</li>
          <li>Consider regular themes: gratitude, goals, reflections</li>
          <li>Keep entries between 2-5 minutes for easier review later</li>
        </ul>
      </div>
    </Container>
  );
}

export default Record;
