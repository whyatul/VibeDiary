import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Modal } from 'react-bootstrap';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { FaCalendarAlt, FaSearch, FaPlay, FaTrash } from 'react-icons/fa';

const History = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Delete functionality
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteVideoId, setDeleteVideoId] = useState(null);
  const [deleteVideoUrl, setDeleteVideoUrl] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedVideos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'Unknown date'
      }));
      
      setVideos(fetchedVideos);
      setFilteredVideos(fetchedVideos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filter videos based on search term
    const filtered = videos.filter(video => {
      return (
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);

  const handleDeleteClick = (videoId, videoUrl) => {
    // Stop event propagation to prevent opening the video
    event.stopPropagation();
    setDeleteVideoId(videoId);
    setDeleteVideoUrl(videoUrl);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteVideoId) return;
    
    setDeleting(true);
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'videos', deleteVideoId));
      
      // Extract the file path from the URL
      const fileUrl = new URL(deleteVideoUrl);
      const filePath = decodeURIComponent(fileUrl.pathname.split('/o/')[1].split('?')[0]);
      
      // Delete from Storage
      const storageRef = ref(storage, filePath);
      await deleteObject(storageRef);
      
      // Update state
      const updatedVideos = videos.filter(video => video.id !== deleteVideoId);
      setVideos(updatedVideos);
      setFilteredVideos(updatedVideos.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ));
      
      // If the deleted video was selected, close it
      if (selectedVideo && selectedVideo.id === deleteVideoId) {
        setSelectedVideo(null);
      }
      
      setShowDeleteModal(false);
      setDeleteVideoId(null);
      setDeleteVideoUrl('');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-gray-800">Your Journal History</h1>
      
      {/* Search Bar */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="p-3">
          <Form.Group className="position-relative">
            <FaSearch className="position-absolute" style={{ left: '15px', top: '12px', zIndex: 10, opacity: 0.5 }} />
            <Form.Control
              type="text"
              placeholder="Search journal entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ps-5"
            />
          </Form.Group>
        </Card.Body>
      </Card>
      
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading your journal entries...</p>
        </div>
      ) : (
        <>
          {/* Selected Video Player */}
          {selectedVideo && (
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Body>
                <Row>
                  <Col lg={8}>
                    <div className="rounded overflow-hidden bg-black">
                      <video 
                        src={selectedVideo.videoUrl} 
                        controls 
                        className="w-100"
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="d-flex justify-content-between align-items-start">
                      <h3 className="h4 mb-2 fw-semibold text-gray-800">{selectedVideo.title}</h3>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteClick(selectedVideo.id, selectedVideo.videoUrl)}
                        className="p-1"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                    <p className="mb-3 text-gray-500">
                      <FaCalendarAlt className="me-2" /> 
                      {selectedVideo.createdAt}
                    </p>
                    <p className="text-gray-600">
                      {selectedVideo.description}
                    </p>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => setSelectedVideo(null)}
                      className="mt-2"
                    >
                      Close Video
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
          
          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <Row>
              {filteredVideos.map(video => (
                <Col md={6} lg={4} key={video.id} className="mb-4">
                  <Card 
                    className="h-100 border-0 shadow-sm"
                    style={{ cursor: 'pointer' }}
                  >
                    <div 
                      className="position-relative bg-dark" 
                      style={{ height: '160px' }}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <FaPlay className="text-white opacity-75" size={40} />
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 m-2 p-1"
                        onClick={(e) => handleDeleteClick(video.id, video.videoUrl)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                    <Card.Body onClick={() => setSelectedVideo(video)}>
                      <h3 className="h5 mb-2 fw-semibold text-gray-800">{video.title}</h3>
                      <p className="mb-2 text-gray-500">
                        <small><FaCalendarAlt className="me-1" /> {video.createdAt}</small>
                      </p>
                      <p className="text-gray-600 mb-0">
                        {video.description && video.description.length > 100 
                          ? `${video.description.substring(0, 100)}...` 
                          : video.description}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5 text-gray-600">
              {searchTerm 
                ? 'No journal entries match your search.' 
                : 'You have no journal entries yet. Start by recording your first video journal!'}
              {!searchTerm && (
                <div className="mt-3">
                  <Button 
                    variant="primary" 
                    href="/record"
                  >
                    Record Your First Entry
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Delete Journal Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this journal entry? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Deleting...
              </>
            ) : (
              'Delete Permanently'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default History;
