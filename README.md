# game_of_life

- Given a board with m by n cells, each cell has an initial state live (1) or dead (0).
- Each cel interacts with its 8 neighbors using the following 4 rules:
    - 1) any live cell with fewer than 2 live eighbors dies, as if caused by under-population
    - 2) any live cell with 2 or 3 live neighbors lives on to the next generation
    - 3) any live cell with more than 3 live neighbors dies, as if by over-population
    - 4) any dead cell with exactly 3 live neighbors becomes a live cell, as if by reproduction
