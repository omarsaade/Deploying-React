import React, { useEffect } from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom'
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

//before using firebase
// const DUMMY_QUOTES = [
//     { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
//     { id: 'q2', author: 'Maximlian', text: 'Learning React is great!' },
// ]




function QuoteDetail() {


    const match = useRouteMatch();
    const params = useParams();

    const { quoteId } = params;

    //the arrangement is very important here
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
    // console.log(params);// { quoteId: 'q1' }
    // console.log(match); // { path: '/quotes/:quoteId', url: '/quotes/q2', isExact: true, params: {… } }
    // const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);


    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    //we need the spinner here cz of delay of time
    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }


    if (error) {
        return <p className='centered focused'>{error}</p>
    }



    if (!loadedQuote.text) {
        return <p>no quote found!</p>;
    }

    return (
        <h1>

            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            {/* <Route path={`/quotes/${params.quoteId}`} exact> */}

            <Route path={match.path} exact>
                <div className='centered'>
                    {/* <Link to={`/quotes/${params.quoteId}/comments`} className='btn--flat'> */}
                    <Link to={`${match.url}/comments`} className='btn--flat'>
                        Load Comments</Link>
                </div>
            </Route>

            {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </h1>
    )
}

export default QuoteDetail
