# Details

Date : 2024-03-28 11:48:02

Directory /Users/tha/Desktop/uni/uog/Project/GIT/Code/backend

Total : 85 files,  4589 codes, 485 comments, 617 blanks, all 5691 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/.env](/backend/.env) | Properties | 6 | 2 | 2 | 10 |
| [backend/app.js](/backend/app.js) | JavaScript | 24 | 22 | 28 | 74 |
| [backend/configs/db.config.js](/backend/configs/db.config.js) | JavaScript | 7 | 0 | 1 | 8 |
| [backend/configs/jwt.config.js](/backend/configs/jwt.config.js) | JavaScript | 4 | 0 | 1 | 5 |
| [backend/controllers/attendance.js](/backend/controllers/attendance.js) | JavaScript | 264 | 47 | 58 | 369 |
| [backend/controllers/department.js](/backend/controllers/department.js) | JavaScript | 49 | 1 | 11 | 61 |
| [backend/controllers/designation.js](/backend/controllers/designation.js) | JavaScript | 93 | 2 | 22 | 117 |
| [backend/controllers/holiday.js](/backend/controllers/holiday.js) | JavaScript | 73 | 8 | 27 | 108 |
| [backend/controllers/leave.js](/backend/controllers/leave.js) | JavaScript | 321 | 90 | 104 | 515 |
| [backend/controllers/login.js](/backend/controllers/login.js) | JavaScript | 30 | 3 | 4 | 37 |
| [backend/controllers/notifications.js](/backend/controllers/notifications.js) | JavaScript | 19 | 0 | 2 | 21 |
| [backend/controllers/overtime.js](/backend/controllers/overtime.js) | JavaScript | 212 | 10 | 50 | 272 |
| [backend/controllers/shift.js](/backend/controllers/shift.js) | JavaScript | 99 | 4 | 13 | 116 |
| [backend/controllers/statistic.js](/backend/controllers/statistic.js) | JavaScript | 34 | 0 | 6 | 40 |
| [backend/controllers/user.js](/backend/controllers/user.js) | JavaScript | 326 | 61 | 79 | 466 |
| [backend/crons/create_user_attendances.js](/backend/crons/create_user_attendances.js) | JavaScript | 50 | 5 | 15 | 70 |
| [backend/crons/index.cron.js](/backend/crons/index.cron.js) | JavaScript | 9 | 0 | 2 | 11 |
| [backend/crons/log_address.cron.js](/backend/crons/log_address.cron.js) | JavaScript | 12 | 0 | 2 | 14 |
| [backend/dao/files.js](/backend/dao/files.js) | JavaScript | 24 | 12 | 8 | 44 |
| [backend/dao/users.js](/backend/dao/users.js) | JavaScript | 99 | 5 | 11 | 115 |
| [backend/index.ts](/backend/index.ts) | TypeScript | 13 | 2 | 5 | 20 |
| [backend/jwt.js](/backend/jwt.js) | JavaScript | 8 | 0 | 2 | 10 |
| [backend/list-routes.ts](/backend/list-routes.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [backend/middlewares/404.js](/backend/middlewares/404.js) | JavaScript | 4 | 0 | 0 | 4 |
| [backend/middlewares/500.js](/backend/middlewares/500.js) | JavaScript | 11 | 3 | 0 | 14 |
| [backend/middlewares/authenticated.js](/backend/middlewares/authenticated.js) | JavaScript | 32 | 6 | 13 | 51 |
| [backend/middlewares/formidable-multipart.js](/backend/middlewares/formidable-multipart.js) | JavaScript | 22 | 9 | 5 | 36 |
| [backend/middlewares/log.js](/backend/middlewares/log.js) | JavaScript | 5 | 0 | 0 | 5 |
| [backend/middlewares/role-limitation.js](/backend/middlewares/role-limitation.js) | JavaScript | 18 | 2 | 7 | 27 |
| [backend/middlewares/zod.js](/backend/middlewares/zod.js) | JavaScript | 10 | 11 | 0 | 21 |
| [backend/migration.js](/backend/migration.js) | JavaScript | 5 | 0 | 1 | 6 |
| [backend/migrations/1709298577459_create_table_users.js](/backend/migrations/1709298577459_create_table_users.js) | JavaScript | 31 | 0 | 0 | 31 |
| [backend/migrations/1709300900527_create_table_roles.js](/backend/migrations/1709300900527_create_table_roles.js) | JavaScript | 11 | 1 | 0 | 12 |
| [backend/migrations/1709302629931_seed_roles.js](/backend/migrations/1709302629931_seed_roles.js) | JavaScript | 11 | 0 | 0 | 11 |
| [backend/migrations/1709304238152_users_add_fk_role_id.js](/backend/migrations/1709304238152_users_add_fk_role_id.js) | JavaScript | 11 | 0 | 0 | 11 |
| [backend/migrations/1709308594538_create_table_departments.js](/backend/migrations/1709308594538_create_table_departments.js) | JavaScript | 11 | 0 | 0 | 11 |
| [backend/migrations/1709308605107_create_table_designations.js](/backend/migrations/1709308605107_create_table_designations.js) | JavaScript | 14 | 0 | 0 | 14 |
| [backend/migrations/1709315420437_create_report_to.js](/backend/migrations/1709315420437_create_report_to.js) | JavaScript | 10 | 0 | 0 | 10 |
| [backend/migrations/1709315923943_users_add_department_id.js](/backend/migrations/1709315923943_users_add_department_id.js) | JavaScript | 4 | 0 | 0 | 4 |
| [backend/migrations/1709315936286_users_add_fk_department_id.js](/backend/migrations/1709315936286_users_add_fk_department_id.js) | JavaScript | 6 | 0 | 0 | 6 |
| [backend/migrations/1709317478622_users_add_designation_id.js](/backend/migrations/1709317478622_users_add_designation_id.js) | JavaScript | 4 | 0 | 0 | 4 |
| [backend/migrations/1709317484666_users_add_fk_designation_id.js](/backend/migrations/1709317484666_users_add_fk_designation_id.js) | JavaScript | 6 | 0 | 0 | 6 |
| [backend/migrations/1709317931204_seed_admin_user.js](/backend/migrations/1709317931204_seed_admin_user.js) | JavaScript | 12 | 0 | 1 | 13 |
| [backend/migrations/1709533659186_create_table_files.js](/backend/migrations/1709533659186_create_table_files.js) | JavaScript | 14 | 0 | 0 | 14 |
| [backend/migrations/1709969858016_users_add_avatar_id.js](/backend/migrations/1709969858016_users_add_avatar_id.js) | JavaScript | 4 | 0 | 0 | 4 |
| [backend/migrations/1709969910025_users_add_fk_avatar_id.js](/backend/migrations/1709969910025_users_add_fk_avatar_id.js) | JavaScript | 6 | 0 | 0 | 6 |
| [backend/migrations/1709982398109_users_add_employment_agreement_id.js](/backend/migrations/1709982398109_users_add_employment_agreement_id.js) | JavaScript | 10 | 0 | 0 | 10 |
| [backend/migrations/1709982456595_users_add_fk_employment_agreement_id.js](/backend/migrations/1709982456595_users_add_fk_employment_agreement_id.js) | JavaScript | 11 | 0 | 0 | 11 |
| [backend/migrations/1710946902635_timebox_2.js](/backend/migrations/1710946902635_timebox_2.js) | JavaScript | 8 | 0 | 0 | 8 |
| [backend/migrations/1710946915413_create_table_holidays.js](/backend/migrations/1710946915413_create_table_holidays.js) | JavaScript | 14 | 0 | 1 | 15 |
| [backend/migrations/1710975501824_users_add_col_report_to.js](/backend/migrations/1710975501824_users_add_col_report_to.js) | JavaScript | 10 | 0 | 2 | 12 |
| [backend/migrations/1711004088235_users_add_fk_report_to_user_id.js](/backend/migrations/1711004088235_users_add_fk_report_to_user_id.js) | JavaScript | 11 | 0 | 1 | 12 |
| [backend/migrations/1711005294157_create_table_leaves.js](/backend/migrations/1711005294157_create_table_leaves.js) | JavaScript | 20 | 0 | 0 | 20 |
| [backend/migrations/1711006245087_create_table_users_leaves.js](/backend/migrations/1711006245087_create_table_users_leaves.js) | JavaScript | 19 | 0 | 1 | 20 |
| [backend/migrations/1711006804474_create_table_users_leaves_requests.js](/backend/migrations/1711006804474_create_table_users_leaves_requests.js) | JavaScript | 37 | 0 | 3 | 40 |
| [backend/migrations/1711164944443_create_table_users_notifications.js](/backend/migrations/1711164944443_create_table_users_notifications.js) | JavaScript | 24 | 0 | 3 | 27 |
| [backend/migrations/1711189195370_create_table_users_shifts.js](/backend/migrations/1711189195370_create_table_users_shifts.js) | JavaScript | 18 | 0 | 2 | 20 |
| [backend/migrations/1711190162438_create_table_users_attendances.js](/backend/migrations/1711190162438_create_table_users_attendances.js) | JavaScript | 22 | 0 | 3 | 25 |
| [backend/migrations/1711191242243_create_table_users_attendances_requests.js](/backend/migrations/1711191242243_create_table_users_attendances_requests.js) | JavaScript | 34 | 0 | 6 | 40 |
| [backend/migrations/1711211607265_users_overtimes_requests.js](/backend/migrations/1711211607265_users_overtimes_requests.js) | JavaScript | 29 | 0 | 5 | 34 |
| [backend/migrations/1711220374966_users_notifications_add_col_attendance_request_id.js](/backend/migrations/1711220374966_users_notifications_add_col_attendance_request_id.js) | JavaScript | 9 | 0 | 0 | 9 |
| [backend/migrations/1711220381024_users_notifications_add_fk_attendance_request_id.js](/backend/migrations/1711220381024_users_notifications_add_fk_attendance_request_id.js) | JavaScript | 12 | 0 | 0 | 12 |
| [backend/migrations/1711220671937_users_notifications_add_col_overtime_request_id.js](/backend/migrations/1711220671937_users_notifications_add_col_overtime_request_id.js) | JavaScript | 9 | 0 | 0 | 9 |
| [backend/migrations/1711220677975_users_notifications_add_fk_overtime_request_id.js](/backend/migrations/1711220677975_users_notifications_add_fk_overtime_request_id.js) | JavaScript | 12 | 0 | 0 | 12 |
| [backend/migrations/1711222542015_seed_users_shifts.js](/backend/migrations/1711222542015_seed_users_shifts.js) | JavaScript | 24 | 0 | 1 | 25 |
| [backend/mysql.js](/backend/mysql.js) | JavaScript | 6 | 0 | 2 | 8 |
| [backend/nodemon.json](/backend/nodemon.json) | JSON | 6 | 0 | 0 | 6 |
| [backend/package-lock.json](/backend/package-lock.json) | JSON | 1,897 | 0 | 1 | 1,898 |
| [backend/package.json](/backend/package.json) | JSON | 37 | 0 | 1 | 38 |
| [backend/routes/attendance.js](/backend/routes/attendance.js) | JavaScript | 18 | 0 | 4 | 22 |
| [backend/routes/auth.js](/backend/routes/auth.js) | JavaScript | 7 | 2 | 3 | 12 |
| [backend/routes/department.js](/backend/routes/department.js) | JavaScript | 13 | 6 | 5 | 24 |
| [backend/routes/designation.js](/backend/routes/designation.js) | JavaScript | 14 | 6 | 5 | 25 |
| [backend/routes/holidays.js](/backend/routes/holidays.js) | JavaScript | 14 | 10 | 8 | 32 |
| [backend/routes/leaves.js](/backend/routes/leaves.js) | JavaScript | 21 | 7 | 12 | 40 |
| [backend/routes/notifications.js](/backend/routes/notifications.js) | JavaScript | 9 | 3 | 4 | 16 |
| [backend/routes/overtime.js](/backend/routes/overtime.js) | JavaScript | 18 | 0 | 4 | 22 |
| [backend/routes/shift.js](/backend/routes/shift.js) | JavaScript | 14 | 0 | 4 | 18 |
| [backend/routes/statistics.js](/backend/routes/statistics.js) | JavaScript | 8 | 7 | 6 | 21 |
| [backend/routes/user.js](/backend/routes/user.js) | JavaScript | 24 | 6 | 12 | 42 |
| [backend/services/fileHandling.js](/backend/services/fileHandling.js) | JavaScript | 54 | 29 | 7 | 90 |
| [backend/tsconfig.json](/backend/tsconfig.json) | JSON with Comments | 15 | 87 | 9 | 111 |
| [backend/utils/date.ts](/backend/utils/date.ts) | TypeScript | 24 | 2 | 13 | 39 |
| [backend/utils/datefns-fast-wrapper.ts](/backend/utils/datefns-fast-wrapper.ts) | TypeScript | 4 | 0 | 4 | 8 |
| [backend/utils/filteredObject.ts](/backend/utils/filteredObject.ts) | TypeScript | 12 | 14 | 4 | 30 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)