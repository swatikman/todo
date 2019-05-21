import React from 'react';
import { Card, Typography, Col } from 'antd';

export default function NotFound() {
    const { Title, Paragraph } = Typography;
    return (
        <Col span={6} offset={9} className="not-found-page">
            <Card>
                <Title>404</Title>
                <Paragraph>
                    Page not found
                </Paragraph>
            </Card>
        </Col>
    )
} 