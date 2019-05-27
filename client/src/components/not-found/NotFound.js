import React from 'react';
import { Card, Typography, Col } from 'antd';

const NotFound = () => {
    const { Title, Paragraph } = Typography;
    return (
        <Col sm={{span: 10, offset: 7}} md={{span: 6, offset: 9}} className="not-found-page">
            <Card>
                <Title>404</Title>
                <Paragraph>
                    Page not found
                </Paragraph>
            </Card>
        </Col>
    )
} 

export default NotFound;