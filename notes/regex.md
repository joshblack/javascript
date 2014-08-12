Regular Expressions have twelve special characters:

1. The backslash `\`
2. The caret `^`
3. The dollar sign `$`
4. The period `.`
5. The pipe `|`
6. The question mark `?`
7. The asterisk `*`
8. The plus sign `+`
9. Opening parenthesis `(`
10. Closing parenthesis `)`
11. Opening square bracket `[`
12. Opening curly brace `{`

These are all considered *metacharacters*.

If you want to escape any of these characters, you must escape them using a backslash.

# Character Classes or Character Sets

A *character class* matches only one out of several characters.


- To match an a or an e, you can use `[ae]` in `gr[ae]y` to match either **gray** or **grey**
- You can use a hypen inside a *character class* to specify a range of characters.
    - `[0-9]` matches a *single* digit between 0 and 9.
    - You can use more than one range
        - `[0-9a-fA-f]` matches a single hexadecimal digit
    - You can combine ranges and single characters
- Typing a caret after the opening square bracket negates the character class
    - `q[^x]` matches `qu` in `question`. But not `Iraq`.

### Shorthand Character Classes

- `\d` matches a single character that is a digit
- `\w` matches a word character, ie alphanumeric characters plus underscore
- `\s` matches a whitespace character.

# The Dot

The Dot matches any single character except for line break characters.

- `gr.y` matches `gray`, `grey`, and `gr&y`

# Anchors

Anchors match a position. 

- `^` matches at the start of the string
- `$` matches at the end of the string
- `\b` matches a word boundary. A word boundary is established as a position between a character that can be matched by `\w` and a character that cannot be matched by `\w`

# Alternation

Alternation is the regular expression equivalent of "or".

- `cat|dog` matches `cat` in `cats and dogs`, and will match `dog` if applied again
    - You can add as many alternatives as you want

**Note:** Alternation has the lowest precedene of all regex operators.

# Repetition

The question mark makes the preceding token in the regular expression optional.

- `colou?r` matches `colour` and `color`

The asterisk tells the engine to attempt to match the preceding token zero or more times.

The plus tells the engine to attempt to match the preceding token once or more.

You can use curly braces to specify a specific amount of repetition.

# Greedy and Lazy Repetition

