# Diff Details

Date : 2024-03-28 11:48:54

Directory /Users/tha/Desktop/uni/uog/Project/GIT/Code/frontend

Total : 207 files,  8269 codes, 307 comments, 677 blanks, all 9253 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/.env](/backend/.env) | Properties | -6 | -2 | -2 | -10 |
| [backend/app.js](/backend/app.js) | JavaScript | -24 | -22 | -28 | -74 |
| [backend/configs/db.config.js](/backend/configs/db.config.js) | JavaScript | -7 | 0 | -1 | -8 |
| [backend/configs/jwt.config.js](/backend/configs/jwt.config.js) | JavaScript | -4 | 0 | -1 | -5 |
| [backend/controllers/attendance.js](/backend/controllers/attendance.js) | JavaScript | -264 | -47 | -58 | -369 |
| [backend/controllers/department.js](/backend/controllers/department.js) | JavaScript | -49 | -1 | -11 | -61 |
| [backend/controllers/designation.js](/backend/controllers/designation.js) | JavaScript | -93 | -2 | -22 | -117 |
| [backend/controllers/holiday.js](/backend/controllers/holiday.js) | JavaScript | -73 | -8 | -27 | -108 |
| [backend/controllers/leave.js](/backend/controllers/leave.js) | JavaScript | -321 | -90 | -104 | -515 |
| [backend/controllers/login.js](/backend/controllers/login.js) | JavaScript | -30 | -3 | -4 | -37 |
| [backend/controllers/notifications.js](/backend/controllers/notifications.js) | JavaScript | -19 | 0 | -2 | -21 |
| [backend/controllers/overtime.js](/backend/controllers/overtime.js) | JavaScript | -212 | -10 | -50 | -272 |
| [backend/controllers/shift.js](/backend/controllers/shift.js) | JavaScript | -99 | -4 | -13 | -116 |
| [backend/controllers/statistic.js](/backend/controllers/statistic.js) | JavaScript | -34 | 0 | -6 | -40 |
| [backend/controllers/user.js](/backend/controllers/user.js) | JavaScript | -326 | -61 | -79 | -466 |
| [backend/crons/create_user_attendances.js](/backend/crons/create_user_attendances.js) | JavaScript | -50 | -5 | -15 | -70 |
| [backend/crons/index.cron.js](/backend/crons/index.cron.js) | JavaScript | -9 | 0 | -2 | -11 |
| [backend/crons/log_address.cron.js](/backend/crons/log_address.cron.js) | JavaScript | -12 | 0 | -2 | -14 |
| [backend/dao/files.js](/backend/dao/files.js) | JavaScript | -24 | -12 | -8 | -44 |
| [backend/dao/users.js](/backend/dao/users.js) | JavaScript | -99 | -5 | -11 | -115 |
| [backend/index.ts](/backend/index.ts) | TypeScript | -13 | -2 | -5 | -20 |
| [backend/jwt.js](/backend/jwt.js) | JavaScript | -8 | 0 | -2 | -10 |
| [backend/list-routes.ts](/backend/list-routes.ts) | TypeScript | -3 | 0 | -1 | -4 |
| [backend/middlewares/404.js](/backend/middlewares/404.js) | JavaScript | -4 | 0 | 0 | -4 |
| [backend/middlewares/500.js](/backend/middlewares/500.js) | JavaScript | -11 | -3 | 0 | -14 |
| [backend/middlewares/authenticated.js](/backend/middlewares/authenticated.js) | JavaScript | -32 | -6 | -13 | -51 |
| [backend/middlewares/formidable-multipart.js](/backend/middlewares/formidable-multipart.js) | JavaScript | -22 | -9 | -5 | -36 |
| [backend/middlewares/log.js](/backend/middlewares/log.js) | JavaScript | -5 | 0 | 0 | -5 |
| [backend/middlewares/role-limitation.js](/backend/middlewares/role-limitation.js) | JavaScript | -18 | -2 | -7 | -27 |
| [backend/middlewares/zod.js](/backend/middlewares/zod.js) | JavaScript | -10 | -11 | 0 | -21 |
| [backend/migration.js](/backend/migration.js) | JavaScript | -5 | 0 | -1 | -6 |
| [backend/migrations/1709298577459_create_table_users.js](/backend/migrations/1709298577459_create_table_users.js) | JavaScript | -31 | 0 | 0 | -31 |
| [backend/migrations/1709300900527_create_table_roles.js](/backend/migrations/1709300900527_create_table_roles.js) | JavaScript | -11 | -1 | 0 | -12 |
| [backend/migrations/1709302629931_seed_roles.js](/backend/migrations/1709302629931_seed_roles.js) | JavaScript | -11 | 0 | 0 | -11 |
| [backend/migrations/1709304238152_users_add_fk_role_id.js](/backend/migrations/1709304238152_users_add_fk_role_id.js) | JavaScript | -11 | 0 | 0 | -11 |
| [backend/migrations/1709308594538_create_table_departments.js](/backend/migrations/1709308594538_create_table_departments.js) | JavaScript | -11 | 0 | 0 | -11 |
| [backend/migrations/1709308605107_create_table_designations.js](/backend/migrations/1709308605107_create_table_designations.js) | JavaScript | -14 | 0 | 0 | -14 |
| [backend/migrations/1709315420437_create_report_to.js](/backend/migrations/1709315420437_create_report_to.js) | JavaScript | -10 | 0 | 0 | -10 |
| [backend/migrations/1709315923943_users_add_department_id.js](/backend/migrations/1709315923943_users_add_department_id.js) | JavaScript | -4 | 0 | 0 | -4 |
| [backend/migrations/1709315936286_users_add_fk_department_id.js](/backend/migrations/1709315936286_users_add_fk_department_id.js) | JavaScript | -6 | 0 | 0 | -6 |
| [backend/migrations/1709317478622_users_add_designation_id.js](/backend/migrations/1709317478622_users_add_designation_id.js) | JavaScript | -4 | 0 | 0 | -4 |
| [backend/migrations/1709317484666_users_add_fk_designation_id.js](/backend/migrations/1709317484666_users_add_fk_designation_id.js) | JavaScript | -6 | 0 | 0 | -6 |
| [backend/migrations/1709317931204_seed_admin_user.js](/backend/migrations/1709317931204_seed_admin_user.js) | JavaScript | -12 | 0 | -1 | -13 |
| [backend/migrations/1709533659186_create_table_files.js](/backend/migrations/1709533659186_create_table_files.js) | JavaScript | -14 | 0 | 0 | -14 |
| [backend/migrations/1709969858016_users_add_avatar_id.js](/backend/migrations/1709969858016_users_add_avatar_id.js) | JavaScript | -4 | 0 | 0 | -4 |
| [backend/migrations/1709969910025_users_add_fk_avatar_id.js](/backend/migrations/1709969910025_users_add_fk_avatar_id.js) | JavaScript | -6 | 0 | 0 | -6 |
| [backend/migrations/1709982398109_users_add_employment_agreement_id.js](/backend/migrations/1709982398109_users_add_employment_agreement_id.js) | JavaScript | -10 | 0 | 0 | -10 |
| [backend/migrations/1709982456595_users_add_fk_employment_agreement_id.js](/backend/migrations/1709982456595_users_add_fk_employment_agreement_id.js) | JavaScript | -11 | 0 | 0 | -11 |
| [backend/migrations/1710946902635_timebox_2.js](/backend/migrations/1710946902635_timebox_2.js) | JavaScript | -8 | 0 | 0 | -8 |
| [backend/migrations/1710946915413_create_table_holidays.js](/backend/migrations/1710946915413_create_table_holidays.js) | JavaScript | -14 | 0 | -1 | -15 |
| [backend/migrations/1710975501824_users_add_col_report_to.js](/backend/migrations/1710975501824_users_add_col_report_to.js) | JavaScript | -10 | 0 | -2 | -12 |
| [backend/migrations/1711004088235_users_add_fk_report_to_user_id.js](/backend/migrations/1711004088235_users_add_fk_report_to_user_id.js) | JavaScript | -11 | 0 | -1 | -12 |
| [backend/migrations/1711005294157_create_table_leaves.js](/backend/migrations/1711005294157_create_table_leaves.js) | JavaScript | -20 | 0 | 0 | -20 |
| [backend/migrations/1711006245087_create_table_users_leaves.js](/backend/migrations/1711006245087_create_table_users_leaves.js) | JavaScript | -19 | 0 | -1 | -20 |
| [backend/migrations/1711006804474_create_table_users_leaves_requests.js](/backend/migrations/1711006804474_create_table_users_leaves_requests.js) | JavaScript | -37 | 0 | -3 | -40 |
| [backend/migrations/1711164944443_create_table_users_notifications.js](/backend/migrations/1711164944443_create_table_users_notifications.js) | JavaScript | -24 | 0 | -3 | -27 |
| [backend/migrations/1711189195370_create_table_users_shifts.js](/backend/migrations/1711189195370_create_table_users_shifts.js) | JavaScript | -18 | 0 | -2 | -20 |
| [backend/migrations/1711190162438_create_table_users_attendances.js](/backend/migrations/1711190162438_create_table_users_attendances.js) | JavaScript | -22 | 0 | -3 | -25 |
| [backend/migrations/1711191242243_create_table_users_attendances_requests.js](/backend/migrations/1711191242243_create_table_users_attendances_requests.js) | JavaScript | -34 | 0 | -6 | -40 |
| [backend/migrations/1711211607265_users_overtimes_requests.js](/backend/migrations/1711211607265_users_overtimes_requests.js) | JavaScript | -29 | 0 | -5 | -34 |
| [backend/migrations/1711220374966_users_notifications_add_col_attendance_request_id.js](/backend/migrations/1711220374966_users_notifications_add_col_attendance_request_id.js) | JavaScript | -9 | 0 | 0 | -9 |
| [backend/migrations/1711220381024_users_notifications_add_fk_attendance_request_id.js](/backend/migrations/1711220381024_users_notifications_add_fk_attendance_request_id.js) | JavaScript | -12 | 0 | 0 | -12 |
| [backend/migrations/1711220671937_users_notifications_add_col_overtime_request_id.js](/backend/migrations/1711220671937_users_notifications_add_col_overtime_request_id.js) | JavaScript | -9 | 0 | 0 | -9 |
| [backend/migrations/1711220677975_users_notifications_add_fk_overtime_request_id.js](/backend/migrations/1711220677975_users_notifications_add_fk_overtime_request_id.js) | JavaScript | -12 | 0 | 0 | -12 |
| [backend/migrations/1711222542015_seed_users_shifts.js](/backend/migrations/1711222542015_seed_users_shifts.js) | JavaScript | -24 | 0 | -1 | -25 |
| [backend/mysql.js](/backend/mysql.js) | JavaScript | -6 | 0 | -2 | -8 |
| [backend/nodemon.json](/backend/nodemon.json) | JSON | -6 | 0 | 0 | -6 |
| [backend/package-lock.json](/backend/package-lock.json) | JSON | -1,897 | 0 | -1 | -1,898 |
| [backend/package.json](/backend/package.json) | JSON | -37 | 0 | -1 | -38 |
| [backend/routes/attendance.js](/backend/routes/attendance.js) | JavaScript | -18 | 0 | -4 | -22 |
| [backend/routes/auth.js](/backend/routes/auth.js) | JavaScript | -7 | -2 | -3 | -12 |
| [backend/routes/department.js](/backend/routes/department.js) | JavaScript | -13 | -6 | -5 | -24 |
| [backend/routes/designation.js](/backend/routes/designation.js) | JavaScript | -14 | -6 | -5 | -25 |
| [backend/routes/holidays.js](/backend/routes/holidays.js) | JavaScript | -14 | -10 | -8 | -32 |
| [backend/routes/leaves.js](/backend/routes/leaves.js) | JavaScript | -21 | -7 | -12 | -40 |
| [backend/routes/notifications.js](/backend/routes/notifications.js) | JavaScript | -9 | -3 | -4 | -16 |
| [backend/routes/overtime.js](/backend/routes/overtime.js) | JavaScript | -18 | 0 | -4 | -22 |
| [backend/routes/shift.js](/backend/routes/shift.js) | JavaScript | -14 | 0 | -4 | -18 |
| [backend/routes/statistics.js](/backend/routes/statistics.js) | JavaScript | -8 | -7 | -6 | -21 |
| [backend/routes/user.js](/backend/routes/user.js) | JavaScript | -24 | -6 | -12 | -42 |
| [backend/services/fileHandling.js](/backend/services/fileHandling.js) | JavaScript | -54 | -29 | -7 | -90 |
| [backend/tsconfig.json](/backend/tsconfig.json) | JSON with Comments | -15 | -87 | -9 | -111 |
| [backend/utils/date.ts](/backend/utils/date.ts) | TypeScript | -24 | -2 | -13 | -39 |
| [backend/utils/datefns-fast-wrapper.ts](/backend/utils/datefns-fast-wrapper.ts) | TypeScript | -4 | 0 | -4 | -8 |
| [backend/utils/filteredObject.ts](/backend/utils/filteredObject.ts) | TypeScript | -12 | -14 | -4 | -30 |
| [frontend/.eslintrc.cjs](/frontend/.eslintrc.cjs) | JavaScript | 21 | 0 | 1 | 22 |
| [frontend/README.md](/frontend/README.md) | Markdown | 5 | 0 | 4 | 9 |
| [frontend/index.html](/frontend/index.html) | HTML | 15 | 0 | 2 | 17 |
| [frontend/package-lock.json](/frontend/package-lock.json) | JSON | 5,222 | 0 | 1 | 5,223 |
| [frontend/package.json](/frontend/package.json) | JSON | 34 | 0 | 1 | 35 |
| [frontend/public/images/vite.svg](/frontend/public/images/vite.svg) | XML | 1 | 0 | 0 | 1 |
| [frontend/src/App.css](/frontend/src/App.css) | CSS | 37 | 0 | 6 | 43 |
| [frontend/src/App.jsx](/frontend/src/App.jsx) | JavaScript JSX | 63 | 15 | 18 | 96 |
| [frontend/src/assets/Icons/Departments/department.svg](/frontend/src/assets/Icons/Departments/department.svg) | XML | 9 | 0 | 1 | 10 |
| [frontend/src/assets/Icons/Designations/designation.svg](/frontend/src/assets/Icons/Designations/designation.svg) | XML | 7 | 0 | 1 | 8 |
| [frontend/src/assets/Icons/calendar.svg](/frontend/src/assets/Icons/calendar.svg) | XML | 6 | 0 | 1 | 7 |
| [frontend/src/assets/Icons/camera.svg](/frontend/src/assets/Icons/camera.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/Icons/chevron-down.svg](/frontend/src/assets/Icons/chevron-down.svg) | XML | 3 | 0 | 1 | 4 |
| [frontend/src/assets/Icons/eye-off.svg](/frontend/src/assets/Icons/eye-off.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/Icons/eye.svg](/frontend/src/assets/Icons/eye.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/Icons/file.svg](/frontend/src/assets/Icons/file.svg) | XML | 7 | 0 | 1 | 8 |
| [frontend/src/assets/Icons/loader.svg](/frontend/src/assets/Icons/loader.svg) | XML | 10 | 0 | 1 | 11 |
| [frontend/src/assets/Icons/lock.svg](/frontend/src/assets/Icons/lock.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/Icons/plus-white.svg](/frontend/src/assets/Icons/plus-white.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/Icons/plus.svg](/frontend/src/assets/Icons/plus.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/Icons/sidenav/dashboard-unselected.svg](/frontend/src/assets/Icons/sidenav/dashboard-unselected.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/Icons/sidenav/dashboard.svg](/frontend/src/assets/Icons/sidenav/dashboard.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/Icons/sidenav/departments-unselected.svg](/frontend/src/assets/Icons/sidenav/departments-unselected.svg) | XML | 9 | 0 | 1 | 10 |
| [frontend/src/assets/Icons/sidenav/departments.svg](/frontend/src/assets/Icons/sidenav/departments.svg) | XML | 9 | 0 | 1 | 10 |
| [frontend/src/assets/Icons/sidenav/designations-unselected.svg](/frontend/src/assets/Icons/sidenav/designations-unselected.svg) | XML | 7 | 0 | 1 | 8 |
| [frontend/src/assets/Icons/sidenav/designations.svg](/frontend/src/assets/Icons/sidenav/designations.svg) | XML | 7 | 0 | 1 | 8 |
| [frontend/src/assets/Icons/sidenav/employees-unselected.svg](/frontend/src/assets/Icons/sidenav/employees-unselected.svg) | XML | 3 | 0 | 1 | 4 |
| [frontend/src/assets/Icons/sidenav/employees.svg](/frontend/src/assets/Icons/sidenav/employees.svg) | XML | 3 | 0 | 1 | 4 |
| [frontend/src/assets/Icons/sidenav/logout.svg](/frontend/src/assets/Icons/sidenav/logout.svg) | XML | 5 | 0 | 1 | 6 |
| [frontend/src/assets/Icons/user.svg](/frontend/src/assets/Icons/user.svg) | XML | 4 | 0 | 1 | 5 |
| [frontend/src/assets/react.svg](/frontend/src/assets/react.svg) | XML | 1 | 0 | 0 | 1 |
| [frontend/src/components/ActivityIndicator.jsx](/frontend/src/components/ActivityIndicator.jsx) | JavaScript JSX | 8 | 0 | 1 | 9 |
| [frontend/src/components/Avatar.jsx](/frontend/src/components/Avatar.jsx) | JavaScript JSX | 26 | 3 | 4 | 33 |
| [frontend/src/components/AvatarInput.jsx](/frontend/src/components/AvatarInput.jsx) | JavaScript JSX | 54 | 5 | 5 | 64 |
| [frontend/src/components/Breadcrumb/Breadcrumb.jsx](/frontend/src/components/Breadcrumb/Breadcrumb.jsx) | JavaScript JSX | 8 | 0 | 1 | 9 |
| [frontend/src/components/Breadcrumb/BreadcrumbItem.jsx](/frontend/src/components/Breadcrumb/BreadcrumbItem.jsx) | JavaScript JSX | 22 | 1 | 2 | 25 |
| [frontend/src/components/Buttons/FilledButton.jsx](/frontend/src/components/Buttons/FilledButton.jsx) | JavaScript JSX | 31 | 0 | 2 | 33 |
| [frontend/src/components/Buttons/GhostButton.jsx](/frontend/src/components/Buttons/GhostButton.jsx) | JavaScript JSX | 37 | 0 | 3 | 40 |
| [frontend/src/components/CheckBox.jsx](/frontend/src/components/CheckBox.jsx) | JavaScript JSX | 39 | 1 | 4 | 44 |
| [frontend/src/components/DatePicker.jsx](/frontend/src/components/DatePicker.jsx) | JavaScript JSX | 79 | 16 | 8 | 103 |
| [frontend/src/components/FileField.jsx](/frontend/src/components/FileField.jsx) | JavaScript JSX | 65 | 9 | 7 | 81 |
| [frontend/src/components/HoverInfo.jsx](/frontend/src/components/HoverInfo.jsx) | JavaScript JSX | 19 | 0 | 2 | 21 |
| [frontend/src/components/LabeledText.jsx](/frontend/src/components/LabeledText.jsx) | JavaScript JSX | 17 | 0 | 1 | 18 |
| [frontend/src/components/Noti/NotiCard.jsx](/frontend/src/components/Noti/NotiCard.jsx) | JavaScript JSX | 55 | 0 | 6 | 61 |
| [frontend/src/components/Noti/NotiStackView.jsx](/frontend/src/components/Noti/NotiStackView.jsx) | JavaScript JSX | 20 | 0 | 2 | 22 |
| [frontend/src/components/Noti/NotiSystem.jsx](/frontend/src/components/Noti/NotiSystem.jsx) | JavaScript JSX | 20 | 3 | 5 | 28 |
| [frontend/src/components/SelectBox.jsx](/frontend/src/components/SelectBox.jsx) | JavaScript JSX | 115 | 8 | 8 | 131 |
| [frontend/src/components/SideNavItem.jsx](/frontend/src/components/SideNavItem.jsx) | JavaScript JSX | 32 | 2 | 7 | 41 |
| [frontend/src/components/TextField.jsx](/frontend/src/components/TextField.jsx) | JavaScript JSX | 72 | 12 | 8 | 92 |
| [frontend/src/configs/api.config.ts](/frontend/src/configs/api.config.ts) | TypeScript | 101 | 179 | 29 | 309 |
| [frontend/src/hooks/AuthStateContext.ts](/frontend/src/hooks/AuthStateContext.ts) | TypeScript | 21 | 14 | 7 | 42 |
| [frontend/src/hooks/statistics/useEffectAllDepartmentData.ts](/frontend/src/hooks/statistics/useEffectAllDepartmentData.ts) | TypeScript | 27 | 0 | 5 | 32 |
| [frontend/src/hooks/statistics/useEffectAllDesignationData.ts](/frontend/src/hooks/statistics/useEffectAllDesignationData.ts) | TypeScript | 27 | 0 | 5 | 32 |
| [frontend/src/hooks/useAllAttendanceRecords.ts](/frontend/src/hooks/useAllAttendanceRecords.ts) | TypeScript | 27 | 3 | 4 | 34 |
| [frontend/src/hooks/useAllAttendanceRequests.ts](/frontend/src/hooks/useAllAttendanceRequests.ts) | TypeScript | 28 | 3 | 4 | 35 |
| [frontend/src/hooks/useAllLeaveRequests.ts](/frontend/src/hooks/useAllLeaveRequests.ts) | TypeScript | 28 | 3 | 4 | 35 |
| [frontend/src/hooks/useAllLeaveTypes.ts](/frontend/src/hooks/useAllLeaveTypes.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [frontend/src/hooks/useAllManagers.ts](/frontend/src/hooks/useAllManagers.ts) | TypeScript | 30 | 3 | 4 | 37 |
| [frontend/src/hooks/useAllOvertimeRequests.ts](/frontend/src/hooks/useAllOvertimeRequests.ts) | TypeScript | 28 | 3 | 4 | 35 |
| [frontend/src/hooks/useAllUserShifts.ts](/frontend/src/hooks/useAllUserShifts.ts) | TypeScript | 27 | 3 | 4 | 34 |
| [frontend/src/hooks/useAllUsersOnLeave.ts](/frontend/src/hooks/useAllUsersOnLeave.ts) | TypeScript | 27 | 3 | 4 | 34 |
| [frontend/src/hooks/useEffectAllDepartments.ts](/frontend/src/hooks/useEffectAllDepartments.ts) | TypeScript | 25 | 0 | 6 | 31 |
| [frontend/src/hooks/useEffectDesignations.ts](/frontend/src/hooks/useEffectDesignations.ts) | TypeScript | 27 | 0 | 7 | 34 |
| [frontend/src/hooks/useEffectGetAllEmployees.ts](/frontend/src/hooks/useEffectGetAllEmployees.ts) | TypeScript | 27 | 0 | 11 | 38 |
| [frontend/src/hooks/useEffectGetHolidays.ts](/frontend/src/hooks/useEffectGetHolidays.ts) | TypeScript | 25 | 0 | 3 | 28 |
| [frontend/src/hooks/useEffectUserDetail.ts](/frontend/src/hooks/useEffectUserDetail.ts) | TypeScript | 25 | 0 | 3 | 28 |
| [frontend/src/hooks/useMonthlyOvertimeStatistics.ts](/frontend/src/hooks/useMonthlyOvertimeStatistics.ts) | TypeScript | 32 | 3 | 3 | 38 |
| [frontend/src/hooks/useUserShifts.ts](/frontend/src/hooks/useUserShifts.ts) | TypeScript | 27 | 3 | 3 | 33 |
| [frontend/src/index.css](/frontend/src/index.css) | CSS | 0 | 5 | 0 | 5 |
| [frontend/src/lib/Chart/AnyChart.jsx](/frontend/src/lib/Chart/AnyChart.jsx) | JavaScript JSX | 6 | 1 | 3 | 10 |
| [frontend/src/lib/LucideIcon.jsx](/frontend/src/lib/LucideIcon.jsx) | JavaScript JSX | 19 | 13 | 2 | 34 |
| [frontend/src/main.jsx](/frontend/src/main.jsx) | JavaScript JSX | 11 | 0 | 2 | 13 |
| [frontend/src/pages/Attendances/AttendanceRequestsPage.jsx](/frontend/src/pages/Attendances/AttendanceRequestsPage.jsx) | JavaScript JSX | 142 | 5 | 8 | 155 |
| [frontend/src/pages/Attendances/AttendancesPage.jsx](/frontend/src/pages/Attendances/AttendancesPage.jsx) | JavaScript JSX | 142 | 6 | 15 | 163 |
| [frontend/src/pages/Dashboard/DashboardPage.jsx](/frontend/src/pages/Dashboard/DashboardPage.jsx) | JavaScript JSX | 24 | 2 | 3 | 29 |
| [frontend/src/pages/Dashboard/charts/DepartmentPersonnelChart.jsx](/frontend/src/pages/Dashboard/charts/DepartmentPersonnelChart.jsx) | JavaScript JSX | 49 | 13 | 7 | 69 |
| [frontend/src/pages/Dashboard/charts/DesignationDistributionChart.jsx](/frontend/src/pages/Dashboard/charts/DesignationDistributionChart.jsx) | JavaScript JSX | 74 | 8 | 7 | 89 |
| [frontend/src/pages/Departments/Cards/DepartmentCard.jsx](/frontend/src/pages/Departments/Cards/DepartmentCard.jsx) | JavaScript JSX | 17 | 0 | 2 | 19 |
| [frontend/src/pages/Departments/DepartmentDetailPage.jsx](/frontend/src/pages/Departments/DepartmentDetailPage.jsx) | JavaScript JSX | 110 | 14 | 18 | 142 |
| [frontend/src/pages/Departments/DepartmentsPage.jsx](/frontend/src/pages/Departments/DepartmentsPage.jsx) | JavaScript JSX | 40 | 2 | 5 | 47 |
| [frontend/src/pages/Designations/Cards/DesignationCard.jsx](/frontend/src/pages/Designations/Cards/DesignationCard.jsx) | JavaScript JSX | 17 | 0 | 2 | 19 |
| [frontend/src/pages/Designations/DesignationDetailPage.jsx](/frontend/src/pages/Designations/DesignationDetailPage.jsx) | JavaScript JSX | 156 | 20 | 23 | 199 |
| [frontend/src/pages/Designations/DesignationsPage.jsx](/frontend/src/pages/Designations/DesignationsPage.jsx) | JavaScript JSX | 62 | 2 | 7 | 71 |
| [frontend/src/pages/Employees/Cards/EmployeeCard.jsx](/frontend/src/pages/Employees/Cards/EmployeeCard.jsx) | JavaScript JSX | 35 | 4 | 4 | 43 |
| [frontend/src/pages/Employees/EmployeeNewPage.jsx](/frontend/src/pages/Employees/EmployeeNewPage.jsx) | JavaScript JSX | 743 | 41 | 72 | 856 |
| [frontend/src/pages/Employees/EmployeesPage.jsx](/frontend/src/pages/Employees/EmployeesPage.jsx) | JavaScript JSX | 50 | 5 | 7 | 62 |
| [frontend/src/pages/Holidays/HolidayDetailPage.jsx](/frontend/src/pages/Holidays/HolidayDetailPage.jsx) | JavaScript JSX | 133 | 3 | 20 | 156 |
| [frontend/src/pages/Holidays/HolidaysPage.jsx](/frontend/src/pages/Holidays/HolidaysPage.jsx) | JavaScript JSX | 124 | 7 | 9 | 140 |
| [frontend/src/pages/HomePage.jsx](/frontend/src/pages/HomePage.jsx) | JavaScript JSX | 69 | 16 | 19 | 104 |
| [frontend/src/pages/LeaveTypes/LeaveTypeDetailPage.jsx](/frontend/src/pages/LeaveTypes/LeaveTypeDetailPage.jsx) | JavaScript JSX | 239 | 9 | 17 | 265 |
| [frontend/src/pages/LeaveTypes/LeaveTypesPage.jsx](/frontend/src/pages/LeaveTypes/LeaveTypesPage.jsx) | JavaScript JSX | 128 | 9 | 7 | 144 |
| [frontend/src/pages/Leaves/LeaveRequestsPage.jsx](/frontend/src/pages/Leaves/LeaveRequestsPage.jsx) | JavaScript JSX | 148 | 7 | 9 | 164 |
| [frontend/src/pages/Leaves/LeavesPage.jsx](/frontend/src/pages/Leaves/LeavesPage.jsx) | JavaScript JSX | 111 | 8 | 8 | 127 |
| [frontend/src/pages/LoginPage.jsx](/frontend/src/pages/LoginPage.jsx) | JavaScript JSX | 113 | 3 | 18 | 134 |
| [frontend/src/pages/NotFoundPage.jsx](/frontend/src/pages/NotFoundPage.jsx) | JavaScript JSX | 15 | 0 | 2 | 17 |
| [frontend/src/pages/Overtimes/OvertimesPage.jsx](/frontend/src/pages/Overtimes/OvertimesPage.jsx) | JavaScript JSX | 180 | 14 | 11 | 205 |
| [frontend/src/pages/Schedules/ScheduleDetailPage.jsx](/frontend/src/pages/Schedules/ScheduleDetailPage.jsx) | JavaScript JSX | 299 | 42 | 32 | 373 |
| [frontend/src/pages/Schedules/SchedulesPage.jsx](/frontend/src/pages/Schedules/SchedulesPage.jsx) | JavaScript JSX | 117 | 5 | 11 | 133 |
| [frontend/src/services/department.ts](/frontend/src/services/department.ts) | TypeScript | 58 | 3 | 6 | 67 |
| [frontend/src/services/designations.ts](/frontend/src/services/designations.ts) | TypeScript | 68 | 12 | 6 | 86 |
| [frontend/src/services/employeeService.ts](/frontend/src/services/employeeService.ts) | TypeScript | 109 | 15 | 14 | 138 |
| [frontend/src/services/holiday.ts](/frontend/src/services/holiday.ts) | TypeScript | 64 | 6 | 9 | 79 |
| [frontend/src/services/signin.ts](/frontend/src/services/signin.ts) | TypeScript | 13 | 0 | 1 | 14 |
| [frontend/src/style/fonts.css](/frontend/src/style/fonts.css) | CSS | 0 | 0 | 1 | 1 |
| [frontend/src/style/tailwind.css](/frontend/src/style/tailwind.css) | CSS | 1,990 | 167 | 602 | 2,759 |
| [frontend/src/style/tailwind.input.css](/frontend/src/style/tailwind.input.css) | CSS | 113 | 1 | 18 | 132 |
| [frontend/src/types/nullish.d.ts](/frontend/src/types/nullish.d.ts) | TypeScript | 1 | 0 | 2 | 3 |
| [frontend/src/types/svg.d.ts](/frontend/src/types/svg.d.ts) | TypeScript | 4 | 0 | 0 | 4 |
| [frontend/src/utils/breakTime.ts](/frontend/src/utils/breakTime.ts) | TypeScript | 8 | 4 | 0 | 12 |
| [frontend/src/utils/capitalized.ts](/frontend/src/utils/capitalized.ts) | TypeScript | 8 | 0 | 1 | 9 |
| [frontend/src/utils/fast-date-fns.ts](/frontend/src/utils/fast-date-fns.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [frontend/src/utils/fullname.ts](/frontend/src/utils/fullname.ts) | TypeScript | 3 | 1 | 0 | 4 |
| [frontend/src/utils/position.ts](/frontend/src/utils/position.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [frontend/src/utils/runAsyncWithAborter.ts](/frontend/src/utils/runAsyncWithAborter.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [frontend/src/utils/scheduleDisplayText.ts](/frontend/src/utils/scheduleDisplayText.ts) | TypeScript | 13 | 6 | 3 | 22 |
| [frontend/src/utils/sleep.ts](/frontend/src/utils/sleep.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [frontend/src/utils/timeDisplayText.ts](/frontend/src/utils/timeDisplayText.ts) | TypeScript | 20 | 6 | 6 | 32 |
| [frontend/src/vite.env.d.ts](/frontend/src/vite.env.d.ts) | TypeScript | 0 | 1 | 1 | 2 |
| [frontend/tailwind.config.js](/frontend/tailwind.config.js) | JavaScript | 118 | 5 | 19 | 142 |
| [frontend/tsconfig.json](/frontend/tsconfig.json) | JSON with Comments | 27 | 5 | 4 | 36 |
| [frontend/tsconfig.node.json](/frontend/tsconfig.node.json) | JSON | 11 | 0 | 1 | 12 |
| [frontend/vite.config.ts](/frontend/vite.config.ts) | TypeScript | 5 | 1 | 2 | 8 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details