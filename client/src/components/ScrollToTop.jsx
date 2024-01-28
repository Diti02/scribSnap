import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//on moving to a new page we all ways scroll to top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;