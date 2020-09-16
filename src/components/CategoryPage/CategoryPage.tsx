import React from 'react';
import { Container, Card, Col, Row, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import CategoryType from '../../types/CategoryType';
import api, { ApiResponse } from '../../api/api';
import { Redirect, Link } from 'react-router-dom';
import ArticleType from '../../types/ArticleType';
import SingleArticlePreview from '../SingleArticlePreview/SingleArticlePreview';

interface CategoryPageProperties {
    match: {
        params: {
            cId: number;
        }
    }
}

interface CategoryPageState {
    isUserLoggedIn: boolean;
    category?: CategoryType;
    message: string;
    articles: ArticleType[];
    filters: {
        keywords: string;
        priceMinimum: number;
        priceMaximum: number;
        order: "name asc" | "name desc" | "price asc" | "price desc";
    };
}

interface CategoryDto {
    categoryId: number;
    name: string;
    categories: {
        categoryId: number;
        name: string;
    }[];
}

interface ArticleDto {
    articleId: number;
    name: string;
    excerpt: string;
    description: string;
    articlePrices: {
        price: number;
    }[];
    photos: {
        imagePath: string;
    }[];
}

export default class CategoryPage extends React.Component<CategoryPageProperties> {
    state: CategoryPageState;

    constructor(props: Readonly<CategoryPageProperties>) {
        super(props);

        this.state = {
            isUserLoggedIn: true,
            message: '',
            articles: [],
            filters: {
                keywords: '',
                priceMinimum: 0.01,
                priceMaximum: 9999.99,
                order: "price asc",
            },
        };
    }

    private filterSearchKeywordsChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState(Object.assign(this.state, Object.assign(this.state.filters, {
            keywords: event.target.value,
        })));
    }

    private filterPriceMinimumChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState(Object.assign(this.state, Object.assign(this.state.filters, {
            priceMinimum: Number(event.target.value),
        })));
    }

    private filterPriceMaximumChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState(Object.assign(this.state, Object.assign(this.state.filters, {
            priceMaximum: Number(event.target.value),
        })));
    }

    private filterSearchOrderChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState(Object.assign(this.state, Object.assign(this.state.filters, {
            order: event.target.value,
        })));
    }

    private applyFilters() {
        this.getCategoryData();
    }

    render() {
        if (this.state.isUserLoggedIn === false) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faListAlt} /> {this.state.category?.name}
                        </Card.Title>

                        <Row>

                        </Row>

                        {this.printArticles()}

                        {this.printMessage()}
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    private printArticles() {
        return (
            <Row className="mt-3">
                <Col xs="12" md="3">
                    { this.printFilters() }
                </Col>
                <Col xs="12" md="9">
                    <Row>
                        {
                            this.state.articles.length === 0 ?
                            <p>No articles found</p> :
                            this.state.articles.map(article => (
                                <SingleArticlePreview article={ article } />
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        );
    }

    private printFilters() {
        return (
            <>
                <Form.Group>
                    <Form.Label htmlFor="search-keywords">
                        Search keywords:
                    </Form.Label>
                    <Form.Control type="text" id="search-keywords"
                                  value={ this.state.filters.keywords }
                                  onChange={ (e) => this.filterSearchKeywordsChanged(e as any) } />
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col xs="12" sm="6">
                            <Form.Label htmlFor="min-price">
                                Min. price:
                            </Form.Label>
                            <Form.Control type="number" id="min-price"
                                        min="0.01" step="0.01"
                                        value={ this.state.filters.priceMinimum }
                                        onChange={ (e) => this.filterPriceMinimumChanged(e as any) } />
                        </Col>
                        <Col xs="12" sm="6">
                            <Form.Label htmlFor="max-price">
                                Max. price:
                            </Form.Label>
                            <Form.Control type="number" id="max-price"
                                        min="0.01" step="0.01"
                                        value={ this.state.filters.priceMaximum }
                                        onChange={ (e) => this.filterPriceMaximumChanged(e as any) } />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="search-order">
                        Search keywords:
                    </Form.Label>
                    <Form.Control as="select" id="search-order"
                                  value={ this.state.filters.order }
                                  onChange={ (e) => this.filterSearchOrderChanged(e as any) }>
                        <option value="name asc">Sort by name ascending</option>
                        <option value="name desc">Sort by name descending</option>
                        <option value="price asc">Sort by price ascending</option>
                        <option value="price desc">Sort by price descending</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Button variant="primary" block onClick={ () => this.applyFilters() }>
                        <FontAwesomeIcon icon={ faSearch } /> Search
                    </Button>
                </Form.Group>
            </>
        );
    }

    private printMessage() {
        if (this.state.message) {
            return;
        }

        return (
            <p>{ this.state.message }</p>
        );
    }

    private renderSingleCategory(category: CategoryType) {
        return (
            <Col xs="12" sm="6" md="4" lg="3">
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title as="p">
                            <strong>
                                {category.name}
                            </strong>
                        </Card.Title>
                        <Link to={`/category/${category.categoryId}/`}
                            className="btn btn-sm btn-primary btn-block">
                            Click to open
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    componentDidMount() {
        this.getCategoryData();
    }

    componentDidUpdate(oldProperties: CategoryPageProperties) {
        if (oldProperties.match.params.cId === this.props.match.params.cId) {
            return;
        }

        this.getCategoryData();
    }

    private setUserLoggedInState(state: boolean) {
        this.setState(Object.assign(this.state, {
            isUserLoggedIn: state,
        }));
    }

    private setCategoryState(category: CategoryType) {
        this.setState(Object.assign(this.state, {
            category: category,
        }));
    }

    private setMessageState(message: string) {
        this.setState(Object.assign(this.state, {
            message: message,
        }));
    }

    private setArticlesState(articles: ArticleType[]) {
        this.setState(Object.assign(this.state, {
            articles: articles,
        }));
    }

    private getCategoryData() {
        api('/api/category/' + this.props.match.params.cId, 'get', {})
            .then((res: ApiResponse) => {
                if (res.status === 'error' || res.status === 'login') {
                    this.setUserLoggedInState(false);
                    return;
                }

                const data: CategoryDto = res.data;

                const categoryData: CategoryType = {
                    categoryId: data.categoryId,
                    name: data.name,

                };

                this.setCategoryState(categoryData);
            });

        const orderParts = this.state.filters.order.split(' ');
        const orderBy = orderParts[0];
        const orderDirection = orderParts[1].toUpperCase();

        api('/api/article/search/', 'post', {
            categoryId: Number(this.props.match.params.cId),
            keywords: this.state.filters.keywords,
            priceMin: this.state.filters.priceMinimum,
            priceMax: this.state.filters.priceMaximum,
            features: [],
            orderBy: orderBy,
            orderDirection: orderDirection,
            page: 1,
            itemsPerPage: 50,
        })
        .then((res: ApiResponse) => {
            if (res.status === 'error' || res.status === 'login') {
                return this.setUserLoggedInState(true);
            }

            if (res.data.statusCode === 0) {
                this.setArticlesState([]);
                this.setMessageState('There are no articles here.');
                return;
            }

            const data: ArticleDto[] = res.data;

            const articles: ArticleType[] = data.map(article => ({
                articleId: article.articleId,
                name: article.name,
                excerpt: article.excerpt,
                description: article.description,
                imageUrl: article.photos ? article.photos[0].imagePath : '',
                price: article.articlePrices.length ? article.articlePrices[0].price : 0,
            }));

            this.setArticlesState(articles);
        })
    }
}