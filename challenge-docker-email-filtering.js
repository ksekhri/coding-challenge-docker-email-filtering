/*
  Design a system, in JavaScript, for 
    1.  constructing email filters,
    2.  boolean operators to combine them,
    3a. functions for evaluating,
    3b. simplifying,
    4.  and serializing these expressions.

  A filter is like 
    {the FIELD "To", CONTAINS "slightlytyler"}

  Boolean operators are like AND, OR, NOT. We use them to express
  composited filters like 
    >  ({the FIELD "To", CONTAINS "slightlytyler"}
    >  OR {the FIELD "CC", CONTAINS "slightlytyler"})
    >  AND (NOT {the FIELD "Subject", CONTAINS "javascript"})

  The `evaluate` function provides a mechanism for deriving a boolean
  value from an expression

  The `simplify` function provides a mechanism for deriving a simplified
  expression from a source expression
  i.e 
    >  {the FIELD "To", CONTAINS "slightlytyler"}
    >  AND {the FIELD "CC", CONTAINS "slightlytyler"}
    >  AND {the FIELD "To", CONTAINS "slightlytyler"}
  can be simplified as 
    >  {the FIELD "To", CONTAINS "slightlytyler"}
    >  AND {the FIELD "CC", CONTAINS "slightlytyler"}
    
  The `serialize` function provides a mechanism for deriving a string
  representation from an expression

  The `deserialize` function provides a mechanism for deriving an expression
  from a string representation
*/

const FIELDS = ['To', 'From', 'CC', 'Date', 'Subject'];

const EMAIL = {
  To: 'slightlytyler',
  From: 'karan',
  Subject: 'javascript',
  Data: 'now',
  CC: '',
};

//     1.  constructing email filters,
//     A filter is like 
//    {the FIELD "To", CONTAINS "slightlytyler"}

const oneFilter = {
  field: 'To',
  contains: 'slightlytyler',
};


//     2.  boolean operators to combine them,

/*

*/

// type Operator = {
//   type: 'and' | 'or' | 'not' | 'pred' | 'const',
//   value: Array<Operator>
// };

// type Filter = [field, contains];
  
const oneExpression = {
  type: 'and',
  value: [
    {
      type: 'or',
      value: [
        {
          type: 'pred',
          value: ['To', 'slightlytyler'],
        },
        {
          type: 'pred',
          value: ['CC', 'slightlytyler'],
        },
      ],
    },
    {
      type: 'not',
      value: [
        {
          type: 'pred',
          value: ['Subject', 'javascript'],
        }
      ],
    },
  ]
};

const reactElement = {
  type: 'div',
  props: {},
  children: [],
};


const simpleExpression = {
  type: 'pred',
  value: ['To', 'slightlytyler'],
};

const evaluate = (expression, filterEval) => {
  // expression 
  switch (expression.type) {
    case 'pred': {
      return filterEval(expression.value);
    };
    case 'or': {
      return evaluate(
        expression.value[0], filterEval
      ) || evaluate(
        expression.value[1], filterEval
      );
    };
    case 'and': {
      return evaluate(
        expression.value[0], filterEval
      ) && evaluate(
        expression.value[1], filterEval
      );
    };
    case 'not': {
      return !evaluate(expression.value[0], filterEval);
    };
    default:
      throw new Error('you missed something');
  }
  
};

const evaluateSingle = email => filter => {
  // returns t/f
  /*
    const EMAIL = {
      To: 'slightlytyler',
      From: 'karan',
      Subject: 'react',
      Data: 'now',
      CC: '',
    };
  */
   return email[filter[0]].includes(filter[1]);
};

const print = val => console.log(JSON.stringify(val, 0, 2));

const evaluateSingleEmail = evaluateSingle(EMAIL)

print(evaluate(oneExpression, evaluateSingleEmail));
