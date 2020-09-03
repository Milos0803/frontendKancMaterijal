import React from 'react';
import api, { ApiResponse } from '../../api/api';
import { Container, Card, Row, Col } from 'react-bootstrap';
import ApiArticleDto from '../../dtos/ApiArticleDto';


interface ArticlePageProperties {
    match: {
        params: {
            aId: number;
        }
    }
}

interface FeatureData {
    name: string;
    value: string;
}

interface ArticlePageState {
    isUserLoggedIn: boolean;
    message: string;
    article?: ApiArticleDto;
    features: FeatureData[];
}

export default class ArticlePage extends React.Component<ArticlePageProperties> {
    state: ArticlePageState;

    constructor(props: Readonly<ArticlePageProperties>) {
        super(props);

        this.state = {
            isUserLoggedIn: true,
            message: '',
            features: [],
        };
    }

    private setLogginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isLoggedIn,
        });

        this.setState(newState);
    }

    private setMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message,
        });

        this.setState(newState);
    }

    private setArticleData(articleData: ApiArticleDto | undefined) {
        const newState = Object.assign(this.state, {
            article: articleData,
        });

        this.setState(newState);
    }

    private setFeatureData(features: FeatureData[]) {
        const newState = Object.assign(this.state, {
            features: features,
        });

        this.setState(newState);
    }

    componentDidMount() {
        this.getArticleData();
    }

    componentDidUpdate(oldProperties: ArticlePageProperties) {
        if (oldProperties.match.params.aId === this.props.match.params.aId) {
            return;
        }

        this.getArticleData();
    }

    getArticleData() {
        api('api/article/' + this.props.match.params.aId, 'get', {})
        .then((res: ApiResponse) => {
            if (res.status === 'login') {
                return this.setLogginState(false);
            }

            if (res.status === 'error') {
                this.setArticleData(undefined);
                this.setMessage('This article does not exist.');
                return;
            }

            const data: ApiArticleDto = res.data;

            this.setMessage('');
            this.setArticleData(data);
        }
        )};
} 

