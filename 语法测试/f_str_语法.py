name = 'Eric'
f'Hello, my name is {name}'


number = 7
f'My lucky number is {number}'


price = 19.99
f'The price of this book is {price}'
'The price of this book is 19.99'

f'A total number of {24 * 8 + 4}'
'A total number of 196'

f'Complex number {(2 + 2j) / (2 - 3j)}'
'Complex number (-0.15384615384615388+0.7692307692307692j)'

name = 'ERIC'
f'My name is {name.lower()}'
'My name is eric'

import math
f'The answer is {math.log(math.pi)}'
'The answer is 1.1447298858494002'

a = 123.456
f'a is {a:8.2f}'
'a is   123.46'
f'a is {a:08.2f}'
'a is 00123.46'
f'a is {a:8.2e}'
'a is 1.23e+02'
f'a is {a:8.2%}'
'a is 12345.60%'
f'a is {a:8.2g}'
'a is  1.2e+02'

s = 'hello'
f's is {s:8s}'
's is hello   '
f's is {s:8.3s}'
's is hel     '
