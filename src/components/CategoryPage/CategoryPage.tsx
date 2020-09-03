import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import CategoryType from '../../types/CategoryType';

interface CategoryPageProperties {
    match: {
        params: {
            cId: number;
        }
    }
}

interface CategoryPageState {
    category?: CategoryType;
}

export default class CategoryPage extends React.Component<CategoryPageProperties> {
    state: CategoryPageState;
    
    constructor(props: Readonly<CategoryPageProperties>) {
        super(props);

        this.state = { };
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faBoxOpen } /> { this.state.category?.name }
                        </Card.Title>

                        ... Article will be show here ...
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    private getCategoryDate() {
        setTimeout(() => {
            const category: CategoryType = {
                name: 'Name of the category #' + this.props.match.params.cId,
                categoryId: this.props.match.params.cId,
                articles: [],
            };

            this.setState({
                category: category,
            });
        }, 1000);
    }

    componentWillMount() {
        this.getCategoryDate();
    }

    componentWillReceiveProps(newProps: CategoryPageProperties) {
        if (newProps.match.params.cId === this.props.match.params.cId) {
            return;
        }

        this.getCategoryDate();
    }
}
