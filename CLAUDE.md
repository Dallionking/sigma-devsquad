# Claude Instructions for Vibe Dev Squad Project

## Operative.sh Usage Instructions

### When to Use Operative.sh
- Use the `mcp7_web_eval_agent` tool for comprehensive UI/UX testing
- Always use after implementing new features or fixing UI issues
- Use for accessibility testing and validation
- Use for performance testing and user experience evaluation

### How to Use Operative.sh Properly

1. **Start the Development Server First**
   ```bash
   npm run dev
   # Wait for server to be ready on http://localhost:3000
   ```

2. **Call the Web Evaluation Tool**
   ```typescript
   mcp7_web_eval_agent({
     url: "http://localhost:3000/dashboard/llm-keys",
     task: "Detailed description of what to test",
     headless_browser: false // Set to true to hide browser popup
   })
   ```

3. **Task Description Best Practices**
   - Be specific about what functionality to test
   - Include accessibility requirements (keyboard navigation, screen readers)
   - Mention visual layout checks (overlapping elements, spacing)
   - Include performance aspects (loading times, responsiveness)
   - Specify user flows to test (add key, edit key, search, filter)

### Example Task Descriptions

**Comprehensive UI/UX Testing:**
```
"Test the LLM Keys Dashboard for complete functionality and accessibility. Check that:
1. All API key cards display properly without overlapping
2. Search and filter functionality works correctly
3. Keyboard navigation works (Tab, Enter, arrow keys, shortcuts)
4. High contrast mode toggle functions properly
5. All buttons and modals are accessible
6. Cards have consistent spacing and alignment
7. Responsive design works on different screen sizes
8. Loading states display correctly
9. Error handling provides clear feedback
10. Screen reader compatibility (ARIA labels, roles)"
```

**Visual Layout Testing:**
```
"Focus on visual layout and spacing issues. Verify that:
1. API key cards are properly spaced and not overlapping
2. Grid layout maintains consistent column widths
3. Card heights are uniform across rows
4. Typography is readable and properly sized
5. Colors meet contrast requirements
6. Icons and buttons are properly aligned
7. Modal dialogs center correctly and are responsive"
```

**Accessibility Testing:**
```
"Perform comprehensive accessibility testing including:
1. Keyboard-only navigation through all interactive elements
2. Screen reader compatibility with proper ARIA labels
3. Focus indicators are visible and clear
4. High contrast mode functionality
5. Skip navigation links work correctly
6. All form controls have proper labels
7. Error messages are announced to screen readers
8. Live regions update appropriately"
```

### Interpreting Results
- Review both the text evaluation and screenshots
- Pay attention to console errors and warnings
- Check for layout issues visible in screenshots
- Verify accessibility features are working as described
- Look for performance issues or slow loading

### Follow-up Actions
- Fix any issues identified in the evaluation
- Re-run tests after making changes
- Document any limitations or known issues
- Update accessibility checklists based on results
