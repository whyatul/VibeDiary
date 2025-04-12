import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaVideo, FaHistory, FaChartLine, FaArrowRight, FaRegLightbulb, FaPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="github-home-page" style={{ width: '100%' }}>
      {/* Hero Section */}
      <div className="hero-section" style={{ 
        textAlign: 'center', 
        marginBottom: '48px',
        padding: '48px 24px',
        backgroundColor: 'var(--color-bg-subtle)',
        borderBottom: '1px solid var(--color-border-muted)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '40px', 
            fontWeight: '700',
            marginBottom: '16px',
            border: 'none',
            color: 'var(--color-fg-default)'
          }}>
            Welcome to VideoJournal
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: 'var(--color-fg-muted)', 
            lineHeight: '1.5',
            marginBottom: '32px'
          }}>
            Record, save, and analyze your thoughts through the power of video journaling
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/record" style={{ textDecoration: 'none' }}>
              <button 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-btn-primary-bg)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  transition: '0.2s cubic-bezier(0.3, 0, 0.5, 1)',
                }}
              >
                <FaVideo style={{ marginRight: '8px' }} /> Start Journaling
                <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </Link>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <button 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-btn-bg)',
                  color: 'var(--color-fg-default)',
                  border: '1px solid var(--color-btn-border)',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  boxShadow: 'var(--color-btn-shadow)',
                  transition: '0.2s cubic-bezier(0.3, 0, 0.5, 1)',
                }}
              >
                <FaChartLine style={{ marginRight: '8px' }} /> View Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Container fluid style={{ maxWidth: '1280px', padding: '0 16px' }}>
        {/* What & Why Section */}
        <Row className="mb-5 equal-height-cards">
          <Col lg={6} className="mb-4">
            <Card style={{ 
              border: '1px solid var(--color-border-default)',
              borderRadius: '6px',
              boxShadow: 'var(--color-shadow-small)'
            }}>
              <Card.Body className="card-body-flex">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ 
                    backgroundColor: 'var(--color-scale-blue-1)', 
                    borderRadius: '6px',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <FaVideo style={{ color: 'var(--color-accent-fg)', fontSize: '20px' }} />
                  </div>
                  <h2 style={{ 
                    margin: 0, 
                    fontSize: '24px', 
                    fontWeight: '600',
                    color: 'var(--color-fg-default)'
                  }}>What is VideoJournal?</h2>
                </div>
                <div className="card-content-wrapper">
                  <p style={{ color: 'var(--color-fg-muted)', fontSize: '16px' }}>
                    VideoJournal is a personal video journaling platform that allows you to:
                  </p>
                  <ul style={{ 
                    color: 'var(--color-fg-default)',
                    fontSize: '16px',
                    paddingLeft: '24px'
                  }}>
                    <li style={{ marginBottom: '8px' }}>Record your thoughts, ideas, and reflections through video</li>
                    <li style={{ marginBottom: '8px' }}>Organize and review your past entries</li>
                    <li style={{ marginBottom: '8px' }}>Track patterns in your mood and topics over time</li>
                    <li>Gain insights through analytical tools</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-4">
            <Card style={{ 
              border: '1px solid var(--color-border-default)',
              borderRadius: '6px',
              boxShadow: 'var(--color-shadow-small)'
            }}>
              <Card.Body className="card-body-flex">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ 
                    backgroundColor: 'var(--color-scale-green-1)', 
                    borderRadius: '6px',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <FaRegLightbulb style={{ color: 'var(--color-success-fg)', fontSize: '20px' }} />
                  </div>
                  <h2 style={{ 
                    margin: 0, 
                    fontSize: '24px', 
                    fontWeight: '600',
                    color: 'var(--color-fg-default)'
                  }}>Why Video Journal?</h2>
                </div>
                <div className="card-content-wrapper">
                  <p style={{ color: 'var(--color-fg-muted)', fontSize: '16px' }}>
                    Video journaling offers unique benefits over traditional journaling:
                  </p>
                  <ul style={{ 
                    color: 'var(--color-fg-default)',
                    fontSize: '16px',
                    paddingLeft: '24px'
                  }}>
                    <li style={{ marginBottom: '8px' }}>Capture tone, emotion, and body language that text cannot</li>
                    <li style={{ marginBottom: '8px' }}>Express yourself more naturally through speaking</li>
                    <li style={{ marginBottom: '8px' }}>Create a more comprehensive record of your thoughts</li>
                    <li>Look back on memories in a more immersive way</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* How It Works Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            padding: '16px 0',
            margin: '0 0 24px 0',
            borderBottom: '1px solid var(--color-border-muted)',
            fontSize: '24px',
            fontWeight: '600',
            textAlign: 'center'
          }}>How It Works</h2>
        </div>
        
        <Row className="mb-5 equal-height-cards">
          <Col md={4} className="mb-4">
            <Card style={{ 
              border: '1px solid var(--color-border-default)',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <Card.Body className="card-body-flex">
                <div style={{ 
                  backgroundColor: 'var(--color-scale-blue-1)',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <FaVideo style={{ color: 'var(--color-accent-fg)', fontSize: '32px' }} />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  marginBottom: '16px',
                  color: 'var(--color-fg-default)'
                }}>Record</h3>
                <div className="card-content-wrapper">
                  <p style={{ 
                    color: 'var(--color-fg-muted)',
                    fontSize: '16px'
                  }}>
                    Record your video journal entries with a simple click. Add a title and description to organize your thoughts.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card style={{ 
              border: '1px solid var(--color-border-default)',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <Card.Body className="card-body-flex">
                <div style={{ 
                  backgroundColor: 'var(--color-scale-blue-1)',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <FaHistory style={{ color: 'var(--color-accent-fg)', fontSize: '32px' }} />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  marginBottom: '16px',
                  color: 'var(--color-fg-default)'
                }}>Review</h3>
                <div className="card-content-wrapper">
                  <p style={{ 
                    color: 'var(--color-fg-muted)',
                    fontSize: '16px'
                  }}>
                    Access your past journal entries anytime. See your growth and changes over time.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card style={{ 
              border: '1px solid var(--color-border-default)',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <Card.Body className="card-body-flex">
                <div style={{ 
                  backgroundColor: 'var(--color-scale-blue-1)',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <FaChartLine style={{ color: 'var(--color-accent-fg)', fontSize: '32px' }} />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  marginBottom: '16px',
                  color: 'var(--color-fg-default)'
                }}>Analyze</h3>
                <div className="card-content-wrapper">
                  <p style={{ 
                    color: 'var(--color-fg-muted)',
                    fontSize: '16px'
                  }}>
                    Gain insights from your journaling patterns with our dashboard analytics.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* CTA */}
        <div style={{
          padding: '32px',
          borderRadius: '6px',
          backgroundColor: 'var(--color-bg-subtle)',
          marginBottom: '48px',
          border: '1px solid var(--color-border-muted)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--color-fg-default)'
          }}>Ready to Start Your Journey?</h2>
          <p style={{ 
            color: 'var(--color-fg-muted)', 
            fontSize: '16px',
            maxWidth: '600px', 
            margin: '0 auto 24px' 
          }}>
            Begin capturing your thoughts and tracking your personal growth today.
          </p>
          <Link to="/record" style={{ textDecoration: 'none' }}>
            <button 
              style={{ 
                backgroundColor: 'var(--color-btn-primary-bg)',
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <FaPlus style={{ marginRight: '8px' }} /> Create Your First Entry
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Home;
