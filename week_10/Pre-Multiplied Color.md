# Pre-Multiplied Color

### Particle rendering (rasterization)
- Particle 1 Color: (0.1, 0.1, 0.0, 0.2), Depth: 1.0
- Particle 2 Color: (0.1, 0.0, 0.1, 0.4), Depth: 2.0

Fine the effective comosited color (RGBA) for the pixel

**Solution:** Formulas: C = C1 + C2\*(1 – A1) and A = A1 + A2\*(1 – A1)



### Ray Tree

If you draw a tree with 1 R and 1 T branches, 

- $R = 0.1,0.1,0.1$, 
- $T = 0.2,0.0,0.1$, 
- $Kr = 0.4, Kt = 0.1$, and $P = 0.0,0.1,0.1$; 

What is the color of the pixel?

**Solution:**

- $Color of pixel = P + Kr*R + Kt*T$, for each color component
- For example, for Red: 0.0 + 0.4\*0.1 + 0.1\*0.2
- Similarly for green and blue