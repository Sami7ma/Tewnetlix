APIs
| Purpose             | API                        |
| ------------------- | -------------------------- |
| Movie information   | TMDB                       |
| Posters & Backdrops | TMDB                       |
| Cast                | TMDB                       |
| Trailers            | YouTube or TMDB videos     |
| Streaming/embed     | Your embed provider        |
| Ratings             | TMDB (or IMDb if licensed) |
| Similar movies      | TMDB recommendations       |

Extra Features
- Autoplay muted trailer on hover over the moviepage.md
- Watchlist DB
- Continue Watching
- Dynamic accent color extracted from the movie poster using a color palette library.
TECH STACK 
-**Frontend:** React Native
- **Styling:** Tailwind CSS
- **Animations:**  Framer Motion
- **Icons:** Luide React
- **Data Fetching:** TanStack Query
- **Routing:** React Router
- **DB:** MongoDB

One feature I'd add that many movie sites don't have

When you open a movie page, instead of showing a static background, use the movie's backdrop image with a subtle zoom animation, a dark gradient overlay, and extract the dominant color from the poster to tint buttons, progress bars, and section highlights. It creates a cinematic experience while keeping the interface clean and elegant.

Dark cinematic:
#0D0D0D

Deep Burgundy:
#40101D

Wine Red:
#731A32

Accent Red:
#8C274C

Muted Gray:
#736868