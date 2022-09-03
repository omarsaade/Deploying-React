import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';


// hayda esmo query parameters       ?sort=asc

//sorting functionallity
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};


/* If compare(a, b) is less than zero, the sort() method sorts 
a to a lower index 
than b.In other words, a will come first.
If compare(a, b) is greater than zero, the sort() method 
sort b to a lower index than a, i.e., b will come first. */


const QuoteList = (props) => {

  const history = useHistory();

  // console.log(match);

  const location = useLocation();
  // console.log(location);

  //to save the current sorting //hayda defauly javascript
  //mesh shi bel react
  const queryParams = new URLSearchParams(location.search);
  // console.log(location.search);         ?sort = desc

  const isSortingAscending = queryParams.get('sort') === 'asc';
  // const isS = queryParams.get('sort');
  // console.log(isS);
  // get('sort') btraje3 el value taba3 el key
  // console.lo1g(isSortingAscending); //false

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);
  // console.log(props.quotes); (2)[{…}, {…}]
  // console.log(isSortingAscending); false
  // console.log(sortedQuotes);    (2) [{…}, {…}]

  // console.log(props.quotes);
  //query parameter is added
  const changeSortingHandler = () => {
    //So, that means that pushing this page here actually rerenders this component.
    //1- history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
    //2- history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`);
    // console.log(location.pathname); //     /quotes
    // console.log(match.url); //             /quotes 

    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    });
  };

  //default desc



  return (
    <Fragment>
      {/* instead of prop quotes. */}
      {/* And since this component function will be re-executed whenever we change the query parameters, */}
      {/* we will get new sorted quotes whenever the query parameters change. */}

      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>

      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
