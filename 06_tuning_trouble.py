with open('inputs/06', 'r') as f:
  input = f.read()

def find_start_marker(n):
  for i in range(len(input) - n):
    letters = input[i:i + n]
    uniques = list(set(letters))
    if (len(uniques) == n):
      return i + n

def part_one():
  return find_start_marker(4)

def part_two():
  return find_start_marker(14)


print(part_one())
print(part_two())
