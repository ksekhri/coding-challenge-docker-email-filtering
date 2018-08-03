# Coding Challenge for Docker - Email Filtering
July 31, 2018 - Phone interview, 40 minutes

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
