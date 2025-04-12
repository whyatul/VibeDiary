import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaVideo, FaClock, FaCalendar, FaChartLine, FaInfoCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEntries: 0,
    weeklyEntries: 0,
    avgDuration: 0,
    recentEntries: [],
    weeklyActivity: [0, 0, 0, 0, 0, 0, 0], // Sun-Sat
    dailyActivity: {}, // For the heatmap
  });
  const [loading, setLoading] = useState(true);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const videosRef = collection(db, 'videos');
        const q = query(videosRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const allVideos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        
        // Get recent videos
        const recentEntries = allVideos.slice(0, 3).map(video => ({
          ...video,
          createdAt: video.createdAt.toLocaleDateString()
        }));
        
        // Calculate weekly entries (last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weeklyEntries = allVideos.filter(video => video.createdAt >= oneWeekAgo).length;
        
        // Calculate weekly activity distribution
        const weeklyActivity = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
        allVideos.forEach(video => {
          const dayOfWeek = video.createdAt.getDay();
          weeklyActivity[dayOfWeek]++;
        });
        
        // Calculate daily activity for heatmap (last 365 days)
        const dailyActivity = {};
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        // Initialize with zeros for all days in the past year
        for (let d = new Date(oneYearAgo); d <= new Date(); d.setDate(d.getDate() + 1)) {
          const dateStr = formatDate(d);
          dailyActivity[dateStr] = 0;
        }
        
        // Count entries for each day
        allVideos.forEach(video => {
          if (video.createdAt >= oneYearAgo) {
            const dateStr = formatDate(video.createdAt);
            if (dailyActivity[dateStr] !== undefined) {
              dailyActivity[dateStr]++;
            }
          }
        });
        
        // Mock average duration (would need actual video duration in a real app)
        const avgDuration = Math.floor(Math.random() * 3) + 2; // between 2-5 minutes
        
        setStats({
          totalEntries: allVideos.length,
          weeklyEntries,
          avgDuration,
          recentEntries,
          weeklyActivity,
          dailyActivity
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Get color intensity based on count with darker, more vibrant colors
  const getColorIntensity = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count === 1) return 'bg-green-200';
    if (count === 2) return 'bg-green-400';
    if (count === 3) return 'bg-green-600';
    if (count >= 4) return 'bg-green-800';
    return 'bg-gray-100';
  };

  // Get background style with custom colors for better visualization
  const getColorStyle = (count) => {
    if (count === 0) return { backgroundColor: '#F3F4F6' }; // Light gray
    if (count === 1) return { backgroundColor: '#BCFACC' }; // Light green
    if (count === 2) return { backgroundColor: '#6EE7B7' }; // Medium green
    if (count === 3) return { backgroundColor: '#10B981' }; // Standard green
    if (count >= 4) return { backgroundColor: '#047857' }; // Dark green
    return { backgroundColor: '#F3F4F6' };
  };

  // Get the days of the week as column headers with improved styling
  const renderDayLabels = () => {
    return ['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, index) => (
      <div 
        key={`day-${index}`} 
        className="text-center text-gray-500"
        style={{ 
          width: '16px', 
          height: '20px',
          fontSize: '0.7rem',
          fontWeight: day ? '500' : 'normal',
          marginBottom: '5px',
          lineHeight: '20px'
        }}
      >
        {day}
      </div>
    ));
  };
  
  // Generate the heat map with improved styling
  const renderHeatMap = () => {
    // Get dates for last 52 weeks, organized by week
    const today = new Date();
    const calendar = [];
    
    // Generate first day of each week (Sunday) for the last 52 weeks
    for (let week = 0; week < 52; week++) {
      const weekDays = [];
      
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (52 - week) * 7 + day - today.getDay());
        const dateStr = formatDate(date);
        const count = stats.dailyActivity[dateStr] || 0;
        
        // Store date info for tooltip and display
        weekDays.push({
          date,
          dateStr,
          count
        });
      }
      
      calendar.push(weekDays);
    }
    
    // Generate month labels
    const monthLabels = [];
    let currentMonth = -1;
    
    calendar.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0].date;
      const month = firstDayOfWeek.getMonth();
      
      if (month !== currentMonth) {
        monthLabels.push({
          month: months[month],
          weekIndex
        });
        currentMonth = month;
      }
    });
    
    return (
      <div className="mt-4 px-3 py-2">
        {/* Month labels with improved positioning and styling */}
        <div className="d-flex mb-3 ps-4 position-relative" style={{ height: "20px" }}>
          {monthLabels.map((label, i) => (
            <div 
              key={`month-${i}`}
              className="text-gray-500 position-absolute"
              style={{ 
                left: `${label.weekIndex * 18 + 20}px`,
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'var(--color-gray-600)'
              }}
            >
              {label.month}
            </div>
          ))}
        </div>
        
        {/* Day labels and heat map grid with better spacing and alignment */}
        <div className="d-flex align-items-start">
          <div 
            className="d-flex flex-column justify-content-around me-2" 
            style={{ height: '140px', width: '24px', paddingTop: '8px' }}
          >
            {renderDayLabels()}
          </div>
          
          <div 
            className="d-flex overflow-auto pb-2 ps-1" 
            style={{ 
              maxWidth: 'calc(100% - 30px)',
              scrollbarWidth: 'thin',
              msOverflowStyle: 'none'
            }}
          >
            {calendar.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="d-flex flex-column me-1">
                {week.map((day, dayIndex) => (
                  <OverlayTrigger
                    key={`day-${weekIndex}-${dayIndex}`}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${day.dateStr}`} className="tooltip-sm">
                        <div className="text-center p-1">
                          <div className="fw-bold mb-1">{day.count} {day.count === 1 ? 'entry' : 'entries'}</div>
                          <div>{day.date.toDateString()}</div>
                        </div>
                      </Tooltip>
                    }
                  >
                    <div 
                      className="rounded-sm"
                      style={{ 
                        ...getColorStyle(day.count),
                        width: '16px', 
                        height: '16px',
                        margin: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease-in-out',
                        boxShadow: day.count > 0 ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                        border: '1px solid rgba(0,0,0,0.05)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.25)';
                        e.currentTarget.style.boxShadow = day.count > 0 ? '0 3px 6px rgba(0,0,0,0.2)' : 'none';
                        e.currentTarget.style.zIndex = '10';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = day.count > 0 ? '0 1px 3px rgba(0,0,0,0.12)' : 'none';
                        e.currentTarget.style.zIndex = '1';
                      }}
                    />
                  </OverlayTrigger>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend with improved styling and darker colors */}
        <div className="d-flex align-items-center justify-content-end mt-3 pe-2">
          <span className="me-2" style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--color-gray-600)' }}>Less</span>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#F3F4F6', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '2px' }}></div>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#BCFACC', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '2px', margin: '0 4px' }}></div>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#6EE7B7', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '2px', margin: '0 4px' }}></div>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#10B981', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '2px', margin: '0 4px' }}></div>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#047857', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '2px', marginLeft: '4px' }}></div>
          <span className="ms-2" style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--color-gray-600)' }}>More</span>
        </div>
      </div>
    );
  };

  // Mock sentiment data (would be calculated from actual video analysis in a real app)
  const sentimentData = [65, 72, 58, 80, 62, 75, 68];

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-gray-800 px-2">Dashboard</h1>
      
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading your insights...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <Row className="mb-4 mx-0">
            <Col md={4} className="mb-3 px-2">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex align-items-center p-4">
                  <div 
                    className="rounded-circle me-4 d-flex align-items-center justify-content-center bg-blue-100" 
                    style={{width: "70px", height: "70px"}}
                  >
                    <FaVideo size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h6 className="mb-1 fw-semibold text-gray-600">Total Entries</h6>
                    <h2 className="mb-0 text-gray-800">{stats.totalEntries}</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-3 px-2">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex align-items-center p-4">
                  <div 
                    className="rounded-circle me-4 d-flex align-items-center justify-content-center bg-green-100" 
                    style={{width: "70px", height: "70px"}}
                  >
                    <FaCalendar size={28} className="text-green-600" />
                  </div>
                  <div>
                    <h6 className="mb-1 fw-semibold text-gray-600">This Week</h6>
                    <h2 className="mb-0 text-gray-800">{stats.weeklyEntries}</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-3 px-2">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex align-items-center p-4">
                  <div 
                    className="rounded-circle me-4 d-flex align-items-center justify-content-center bg-purple-100" 
                    style={{width: "70px", height: "70px"}}
                  >
                    <FaClock size={28} className="text-purple-600" />
                  </div>
                  <div>
                    <h6 className="mb-1 fw-semibold text-gray-600">Avg Duration</h6>
                    <h2 className="mb-0 text-gray-800">{stats.avgDuration} min</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Activity Heat Map with improved card styling */}
          <Row className="mb-4 mx-0">
            <Col className="px-2">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h5 mb-0 fw-semibold fs-5 text-gray-800">Yearly Activity</h3>
                    <div className="d-flex align-items-center">
                      <span className="text-gray-500 me-2" style={{ fontSize: '0.9rem' }}>
                        {new Date().getFullYear()} Entries
                      </span>
                      <OverlayTrigger
                        placement="left"
                        overlay={
                          <Tooltip>
                            <div className="p-1">
                              Each box represents a day.<br/>
                              Colors indicate number of entries.
                            </div>
                          </Tooltip>
                        }
                      >
                        <div className="text-gray-400" style={{ cursor: 'pointer' }}>
                          <FaInfoCircle />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                  
                  <div 
                    className="overflow-auto pb-2 mt-2"
                    style={{
                      backgroundColor: 'rgba(249, 250, 251, 0.5)',
                      borderRadius: '0.5rem',
                      padding: '0.5rem'
                    }}
                  >
                    {renderHeatMap()}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mb-4 mx-0">
            {/* Weekly Activity Chart */}
            <Col md={6} className="mb-4 px-2">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="h5 mb-0 fw-semibold fs-5 text-gray-800">Weekly Activity</h3>
                    <div className="px-3 py-1 rounded bg-gray-100">
                      <small className="text-gray-600">
                        <FaVideo className="me-1" /> {stats.weeklyEntries} entries
                      </small>
                    </div>
                  </div>
                  
                  <div style={{ height: "220px" }} className="d-flex align-items-end justify-content-between px-2 pt-3">
                    {stats.weeklyActivity.map((count, index) => (
                      <div key={index} className="d-flex flex-column align-items-center">
                        <div 
                          className="bg-primary-dark"
                          style={{ 
                            width: '32px', 
                            height: `${count === 0 ? 10 : Math.min(count * 30, 180)}px`, 
                            minHeight: '10px',
                            borderRadius: '6px',
                            transition: 'height 0.5s, opacity 0.3s',
                            opacity: count === 0 ? 0.3 : 1
                          }}
                        ></div>
                        <div className="mt-3 text-gray-600 fw-medium">{days[index]}</div>
                        <div className="small text-gray-600 mt-1">{count}</div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Sentiment Chart */}
            <Col md={6} className="mb-4 px-2">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="h5 mb-0 fw-semibold fs-5 text-gray-800">Mood Analysis</h3>
                    <div className="px-3 py-1 rounded bg-gray-100">
                      <small className="text-gray-600">
                        <FaChartLine className="me-1" /> Weekly trend
                      </small>
                    </div>
                  </div>
                  
                  <div style={{ height: "220px", position: "relative" }} className="px-2 pt-3">
                    <svg width="100%" height="100%" viewBox="0 0 700 200" preserveAspectRatio="none">
                      {/* Background grid lines */}
                      <line x1="0" y1="50" x2="700" y2="50" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="100" x2="700" y2="100" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="150" x2="700" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" />
                      
                      {/* SVG path for sentiment line with smoother curve */}
                      <path
                        d={`M0,${200 - (sentimentData[0]/100 * 180)} ${sentimentData.map((value, i) => (
                          `L${i * 116},${200 - (value/100 * 180)}`
                        )).join(' ')}`}
                        stroke="#4F46E5"
                        strokeWidth="3"
                        fill="none"
                      />
                      
                      {/* Data points */}
                      {sentimentData.map((value, i) => (
                        <circle
                          key={i}
                          cx={i * 116}
                          cy={200 - (value/100 * 180)}
                          r="6"
                          fill="#4F46E5"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="position-absolute bottom-0 w-100 d-flex justify-content-between px-2">
                      {days.map((day, i) => (
                        <div key={i} className="text-center text-gray-600 fw-medium">
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Recent Entries */}
          <Row className="mx-0">
            <Col className="px-2">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="h5 mb-4 fw-semibold fs-5 text-gray-800">Recent Journal Entries</h3>
                  
                  {stats.recentEntries.length > 0 ? (
                    stats.recentEntries.map((entry) => (
                      <div 
                        key={entry.id} 
                        className="d-flex mb-3 p-3 rounded bg-gray-100"
                      >
                        <div 
                          className="flex-shrink-0 bg-dark rounded me-3 position-relative overflow-hidden" 
                          style={{width: "110px", height: "75px"}}
                        >
                          {/* Play icon overlay for video thumbnail */}
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <FaVideo className="text-white opacity-75" size={24} />
                          </div>
                        </div>
                        <div>
                          <h4 className="h6 mb-1 fw-semibold text-gray-800">{entry.title}</h4>
                          <p className="mb-1 small text-gray-500">
                            <FaCalendar className="me-1" /> {entry.createdAt}
                          </p>
                          <p className="mb-0 small text-gray-600">
                            {entry.description && entry.description.length > 70 
                              ? `${entry.description.substring(0, 70)}...` 
                              : entry.description || 'No description provided.'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-600">
                      <p>No journal entries yet. Start recording to see your analytics.</p>
                      <Button 
                        variant="primary" 
                        href="/record"
                        className="mt-2"
                      >
                        <FaVideo className="me-2" />
                        Record Your First Entry
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
