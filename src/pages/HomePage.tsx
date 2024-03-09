import { Carousel, Row, Col } from 'antd';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Product } from '../types/Product';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../hooks/productHooks';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import { Container } from 'react-bootstrap';
import ProductItem from '../components/ProductItem';
import { useState, useEffect } from 'react';
import '../App.css';


function HomePage() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [images, setImages] = useState<string[]>([]);

  // Function to fetch images dynamically
  const fetchImages = () => {
    const imageNames = ['banner1', 'banner2', 'banner3']; 
    const fetchedImages = imageNames.map(name => `/banner/${name}.jpg`);
    setImages(fetchedImages);
  };
 
  // Fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);
  
  return (
    <div>
      <Helmet>
        <title>PharmaEase</title>
      </Helmet>
     

  <div className="pic-ctn ">
  {images.map((image, index) => (
            <img key={index} src={image} alt={`Banner ${index + 1}`} id='banner' className='pic' style={{width:"100%"}}/>
          ))}
   
  </div>
      
      <Container style={{ marginTop: '40px' }}>
        <h2>Latest Products</h2>
        {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
        ) : (
          <Row gutter={[16, 16]}>
            {data!.latestProducts.map((product: Product) => (
              <Col key={product.slug} xs={24} sm={12} md={8} lg={6}>
                <ProductItem product={product}></ProductItem>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      
     
    </div>
  );
}

export default HomePage;
