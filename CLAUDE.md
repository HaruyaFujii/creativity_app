# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start the Expo development server
npm start

# Run on specific platforms
npm run android  # Start on Android
npm run ios      # Start on iOS
npm run web      # Start in web browser

# Linting
npm run lint     # Run ESLint via Expo
```

## Architecture Overview

This is a React Native creativity assessment app built with Expo SDK 53. The app implements psychological creativity tests including the Alternative Uses Test (AUT) and Remote Associates Test (RAT).

### Key Architectural Patterns

1. **Navigation**: Uses Expo Router v5 with file-based routing
   - Stack navigation with custom headers (`headerShown: false`)
   - All screens are in `app/screens/`
   - Entry point is `app/index.tsx` which redirects to `/screens/LanguageScreen`

2. **State Management**: Context API pattern
   - `CheckContext`: Manages boolean states for checkboxes
   - `LanguageContext`: Manages language selection (ja/en)
   - `RadioContext`: Manages radio button states
   - All contexts are wrapped at the root level in `app/_layout.tsx`

3. **Firebase Integration**:
   - Authentication and Firestore configured in `lib/firebase.ts`
   - Direct imports of `db` and `auth` instances throughout the app
   - Data fetching utilities in `app/lib/` for Firebase operations

4. **Component Organization**:
   - Screens: `app/screens/` - All navigation screens
   - Components: `app/components/` - Reusable components (Timer)
   - Constants: `app/constants/` - Static data definitions
   - Types: `app/types/` - TypeScript interfaces

### User Flow

1. LanguageScreen → User selects language
2. RegisterScreen/LoginScreen → Authentication
3. SelectScreen → Choose test type (AUT/RAT)
4. AUTScreen/RATScreen → Take timed tests
5. CheckScreen/Top2Screen/QuestionScreen → View results

### Technology Stack

- **React Native 0.79.2** with **React 19**
- **Expo Router v5** for navigation
- **React Native Paper v5.14** for UI components
- **Firebase** for backend (Auth + Firestore)
- **TypeScript** with strict mode enabled
- **AsyncStorage** for local persistence