# Engineering Rules

- Dự án sử dụng NestJS, Fastify, MongoDB và Mongoose.
- Tuân thủ Clean Architecture, SOLID và Dependency Rule.
- Controller không truy cập database.
- Application use case không inject Mongoose Model.
- Domain không phụ thuộc NestJS hoặc Mongoose.
- Mongoose schema, mapper và repository implementation nằm trong infrastructure.
- Không tạo generic repository hoặc base CRUD service.
- Không thêm dependency khi chưa thực sự cần.
- Sau thay đổi phải chạy lint, test và build.
- Khi thay đổi tech stack, environment hoặc cấu trúc thư mục phải cập nhật README.
