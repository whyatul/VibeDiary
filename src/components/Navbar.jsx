import { Navbar as BNavbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaVideo, FaBook, FaHistory, FaChartBar, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  
  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header className="github-header" style={{ 
      backgroundColor: 'var(--color-header-bg)',
      padding: 0,
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid var(--color-border-muted)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        height: '60px',
        padding: '0 16px',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        <div className="header-logo" style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center',
            textDecoration: 'none',
            color: 'white',
            fontWeight: 600,
            fontSize: '18px'
          }}>
            <FaVideo style={{ color: 'white', marginRight: '8px' }} />
            <span>VideoJournal</span>
          </Link>
        </div>
        
        <div className="header-search" style={{
          flex: "1 1 auto",
          position: "relative",
          maxWidth: "272px",
          marginRight: "16px"
        }}>
          <div style={{
            position: "relative",
            borderRadius: "6px",
            overflow: "hidden"
          }}>
            <FaSearch style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              color: '#8c959f',
              fontSize: "14px"
            }} />
            <input
              type="text"
              placeholder="Search journals..."
              style={{
                width: "100%",
                height: "30px",
                padding: "5px 12px 5px 32px",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#ffffff",
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(240,246,252,0.1)",
                borderRadius: "6px",
              }}
            />
          </div>
        </div>
        
        <div className="header-nav" style={{
          display: 'flex',
          flex: '1 1 auto',
          alignItems: 'center'
        }}>
          <Nav style={{ 
            display: 'flex',
            alignItems: 'center'
          }}>
            <NavItem 
              to="/"
              icon={<FaBook />}
              text="Home"
              isActive={isActive('/')}
            />
            <NavItem 
              to="/record" 
              icon={<FaVideo />}
              text="Record"
              isActive={isActive('/record')}
            />
            <NavItem 
              to="/history" 
              icon={<FaHistory />}
              text="History"
              isActive={isActive('/history')}
            />
            <NavItem 
              to="/dashboard" 
              icon={<FaChartBar />}
              text="Dashboard"
              isActive={isActive('/dashboard')}
            />
          </Nav>
          
          <div style={{ marginLeft: 'auto' }}>
            <button 
              style={{ 
                backgroundColor: 'var(--color-btn-primary-bg)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '5px 16px',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FaVideo style={{ marginRight: '8px' }} /> New Entry
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Navigation Item Component
const NavItem = ({ to, icon, text, isActive }) => {
  return (
    <Nav.Link 
      as={Link} 
      to={to} 
      style={{ 
        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
        position: 'relative',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: isActive ? '600' : '400',
        display: 'flex',
        alignItems: 'center',
        marginRight: '8px'
      }}
    >
      <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
        {icon}
      </span>
      {text}
      {isActive && (
        <div style={{
          position: 'absolute',
          bottom: '-1px',
          left: '0',
          right: '0',
          height: '2px',
          backgroundColor: '#f78166',
          borderRadius: '6px 6px 0 0'
        }}></div>
      )}
    </Nav.Link>
  );
};

export default Navbar;
