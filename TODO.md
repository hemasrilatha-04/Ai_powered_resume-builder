# TODO: Thorough Testing of Resume Builder Project

## 1. Test Navigation to Examples and Pricing Pages
- [ ] Verify /examples route loads Examples component
- [ ] Verify /pricing route loads Pricing component
- [ ] Check that pages render without errors

## 2. Test Dashboard Functionality
- [ ] Verify dashboard loads and displays resume count
- [ ] Test loading resumes from API
- [ ] Test "Create New Resume" button navigation

## 3. Test Full CRUD Operations
- [x] Test creating a new resume via API (Status: 201, ID: 15)
- [x] Test reading resumes (list and individual) (GET list: 200, GET single: 200)
- [x] Test updating an existing resume (PUT: 200, name updated)
- [x] Test deleting a resume (DELETE: 204)

## 4. Test API Endpoints Connectivity
- [x] Verify GET /api/resumes/ returns resume list (Status: 200, returns 1 resume)
- [x] Verify POST /api/resumes/ creates resume (Status: 201, ID: 15)
- [x] Verify GET /api/resumes/<id>/ returns single resume (Status: 200)
- [x] Verify PUT /api/resumes/<id>/ updates resume (Status: 200)
- [x] Verify DELETE /api/resumes/<id>/ deletes resume (Status: 204)

## 5. Test Authentication Flow
- [x] Test login endpoint POST /api/auth/login/ (Status: 200, message: Login successful)
- [x] Test register endpoint POST /api/auth/register/ (Status: 201, message: User created successfully)
- [ ] Verify protected routes work with authentication

## 6. Test Resume Editor Functionality
- [ ] Test loading resume in editor
- [ ] Test saving changes to resume
- [ ] Test navigation to/from editor
