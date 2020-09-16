import React from 'react';
import ArticleType from '../../types/ArticleType';
import { Col, Card } from 'react-bootstrap';
import { ApiConfig } from '../../config/api.config';
import { Link } from 'react-router-dom';

interface ArticlePreviewProperties {
    article: ArticleType;
}

export default class ArticlePreview extends React.Component<ArticlePreviewProperties> {
    render() {
        return (
            <Col xs="12" sm="6" md="6" lg="4">
                <Card className="mb-3">
                    <Card.Header>
                        <img src={ ApiConfig.PHOTO_BASE + 'small/' + this.props.article.imageUrl }
                             alt={ this.props.article.name }
                             className="w-100" />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title as="p">
                            { this.props.article.name }
                        </Card.Title>
                        <Card.Text>
                            { this.props.article.excerpt }
                        </Card.Text>
                        <Card.Text>
                            Price: { Number(this.props.article.price).toFixed(0) } EUR
                        </Card.Text>
                        <Link to={ '/article/' + this.props.article.articleId }
                              className="btn btn-sm btn-primary btn-block">
                            View article
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}
