# Article Management Backend

Backend API dùng để quản lý:

- Company
- Domain
- Keyword
- Sub-keyword
- Article

Dự án được xây dựng bằng NestJS, Fastify và MongoDB theo kiến trúc Modular Monolith kết hợp Clean Architecture.

---

## Tech Stack

### Core

- Node.js
- TypeScript
- NestJS

### HTTP Server

- Fastify
- `@nestjs/platform-fastify`

### Database

- MongoDB
- Mongoose
- `@nestjs/mongoose`

### API Documentation

- Swagger
- OpenAPI
- `@nestjs/swagger`

### Configuration

- `@nestjs/config`

### Validation

- `class-validator`
- `class-transformer`

### Architecture

- Modular Monolith
- Feature-first Architecture
- Clean Architecture
- SOLID Principles
- Dependency Injection
- Repository Pattern

---

## System Architecture

Mỗi business module được chia thành bốn tầng:

```text
Presentation
    ↓
Application
    ↓
Domain
    ↑
Infrastructure
```

### Presentation

Chịu trách nhiệm giao tiếp với bên ngoài hệ thống:

- Controller
- HTTP request
- HTTP response
- Request DTO
- Swagger decorator
- Validation đầu vào

### Application

Chứa các use case của hệ thống:

- Tạo dữ liệu
- Cập nhật dữ liệu
- Lấy danh sách
- Lấy chi tiết
- Xóa dữ liệu
- Điều phối luồng nghiệp vụ

Application không truy cập trực tiếp MongoDB hoặc Mongoose.

### Domain

Chứa nghiệp vụ cốt lõi:

- Entity
- Value Object
- Repository abstraction
- Domain rule
- Domain error

Domain không phụ thuộc vào:

- NestJS
- Fastify
- MongoDB
- Mongoose
- Swagger

### Infrastructure

Chứa các chi tiết kỹ thuật:

- Mongoose schema
- MongoDB repository
- Mapper
- Database connection
- External service implementation

Infrastructure triển khai các interface được định nghĩa trong Domain hoặc Application.

---

## Dependency Rule

Chiều phụ thuộc phải hướng vào bên trong:

```text
Presentation ──────► Application
                           │
                           ▼
                        Domain

Infrastructure ─────► Domain abstractions
```

Các quy tắc bắt buộc:

```text
Controller không truy cập MongoDB.

Use case không inject Mongoose Model.

Domain không import NestJS hoặc Mongoose.

Repository interface nằm trong Domain.

Mongoose repository nằm trong Infrastructure.

Module chịu trách nhiệm liên kết interface với implementation.
```

---

## Main Modules

Dự án gồm các module nghiệp vụ:

```text
company
domain
keyword
sub-keyword
article
```

### Company

Quản lý thông tin công ty.

### Domain

Quản lý các website hoặc domain thuộc công ty.

### Keyword

Quản lý từ khóa chính thuộc một domain.

### Sub-keyword

Quản lý từ khóa phụ thuộc một keyword.

### Article

Quản lý nội dung bài viết và các liên kết với company, domain, keyword và sub-keyword.

---

## Data Relationships

```text
Company
   │
   └── Domain
          │
          └── Keyword
                 │
                 └── SubKeyword

Article
   ├── companyId
   ├── domainId
   ├── keywordId
   └── subKeywordId
```

Quan hệ tổng quát:

- Một Company có nhiều Domain.
- Một Domain thuộc một Company.
- Một Domain có nhiều Keyword.
- Một Keyword thuộc một Domain.
- Một Keyword có nhiều SubKeyword.
- Một SubKeyword thuộc một Keyword.
- Một Article thuộc một Company và một Domain.
- Một Article liên kết với Keyword và có thể có SubKeyword.

Các quan hệ được lưu bằng MongoDB `ObjectId`.

---

## Project Structure

```text
src/
├── main.ts
├── app.module.ts
│
├── config/
│   ├── app.config.ts
│   ├── database.config.ts
│   └── env.validation.ts
│
├── infrastructure/
│   └── database/
│       └── database.module.ts
│
├── common/
│   ├── constants/
│   ├── dto/
│   ├── errors/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   ├── types/
│   └── utils/
│
└── modules/
    ├── company/
    ├── domain/
    ├── keyword/
    ├── sub-keyword/
    └── article/
```

---

## Module Structure

Mỗi business module sử dụng cấu trúc:

```text
module-name/
├── module-name.module.ts
│
├── domain/
│   ├── entities/
│   ├── repositories/
│   ├── value-objects/
│   └── errors/
│
├── application/
│   └── use-cases/
│
├── infrastructure/
│   └── persistence/
│       └── mongoose/
│           ├── schemas/
│           ├── mappers/
│           └── repositories/
│
└── presentation/
    └── http/
        ├── dto/
        ├── responses/
        └── module-name.controller.ts
```

Không bắt buộc tạo thư mục rỗng. Chỉ tạo `value-objects`, `responses` hoặc `errors` khi module thực sự cần.

---

## Common Directory

Thư mục `common` chỉ chứa thành phần dùng chung cho nhiều module:

```text
common/
├── constants/
├── dto/
├── errors/
├── filters/
├── interceptors/
├── pipes/
├── types/
└── utils/
```

Ví dụ:

- DTO phân trang.
- Pipe kiểm tra MongoDB ObjectId.
- Global exception filter.
- Response interceptor.
- Kiểu dữ liệu phân trang.
- Hàm tạo slug.
- Error nền tảng.

`common` không được chứa business logic riêng của Company, Domain, Keyword hoặc Article.

---

## SOLID Principles

### Single Responsibility Principle

Mỗi thành phần chỉ có một trách nhiệm:

```text
Controller  → xử lý HTTP
Use Case    → xử lý một hành động nghiệp vụ
Entity      → bảo vệ quy tắc domain
Repository  → truy cập dữ liệu
Mapper      → chuyển đổi dữ liệu
```

### Open/Closed Principle

Use case phụ thuộc repository abstraction, vì vậy có thể thay đổi cách lưu dữ liệu mà không sửa business logic.

### Liskov Substitution Principle

Các repository implementation phải có thể thay thế lẫn nhau:

```text
MongooseCompanyRepository
InMemoryCompanyRepository
PostgresCompanyRepository
```

### Interface Segregation Principle

Mỗi module có repository interface riêng, chỉ khai báo các phương thức mà module thực sự cần.

### Dependency Inversion Principle

Application phụ thuộc abstraction thay vì phụ thuộc trực tiếp Mongoose:

```text
Use Case
   ↓
Repository Interface
   ↑
Mongoose Repository
```

---

## Installation

```bash
npm install
```

---

## Environment Variables

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cấu hình mẫu:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://localhost:27017/nest_article_db

CORS_ORIGINS=http://localhost:5173
```

Không commit file `.env` lên Git.

---

## Running the Application

Chạy development:

```bash
npm run start:dev
```

Chạy production:

```bash
npm run build
npm run start:prod
```

---

## API URL

```text
http://localhost:3000/api/v1
```

---

## Swagger Documentation

```text
http://localhost:3000/api/docs
```

Swagger cung cấp tài liệu cho các nhóm API:

- Company
- Domain
- Keyword
- Sub-keyword
- Article

---

## API Endpoints

### Company

```text
POST   /api/v1/companies
GET    /api/v1/companies
GET    /api/v1/companies/:id
PATCH  /api/v1/companies/:id
DELETE /api/v1/companies/:id
```

### Domain

```text
POST   /api/v1/domains
GET    /api/v1/domains
GET    /api/v1/domains/:id
PATCH  /api/v1/domains/:id
DELETE /api/v1/domains/:id
```

### Keyword

```text
POST   /api/v1/keywords
GET    /api/v1/keywords
GET    /api/v1/keywords/:id
PATCH  /api/v1/keywords/:id
DELETE /api/v1/keywords/:id
```

### Sub-keyword

```text
POST   /api/v1/sub-keywords
GET    /api/v1/sub-keywords
GET    /api/v1/sub-keywords/:id
PATCH  /api/v1/sub-keywords/:id
DELETE /api/v1/sub-keywords/:id
```

### Article

```text
POST   /api/v1/articles
GET    /api/v1/articles
GET    /api/v1/articles/:id
PATCH  /api/v1/articles/:id
DELETE /api/v1/articles/:id
```

---

## Request Flow

```text
HTTP Request
      │
      ▼
Controller
      │
      ▼
Request DTO
      │
      ▼
Use Case
      │
      ▼
Domain Entity
      │
      ▼
Repository Interface
      │
      ▼
Mongoose Repository
      │
      ▼
MongoDB
```

---

## Development Rules

### Controller

Controller chỉ:

- Nhận request.
- Validate DTO.
- Gọi use case.
- Trả response.

Controller không:

- Inject Mongoose Model.
- Query MongoDB.
- Chứa business logic.

### Use Case

Use case chỉ:

- Thực hiện một hành động nghiệp vụ.
- Sử dụng domain entity.
- Gọi repository abstraction.

Use case không:

- Biết Fastify request.
- Biết Swagger.
- Query Mongoose trực tiếp.

### Domain

Domain chỉ chứa nghiệp vụ cốt lõi và không phụ thuộc framework.

### Infrastructure

Infrastructure triển khai chi tiết kỹ thuật, nhưng không quyết định business rule.

---

## Current Development Scope

Phiên bản đầu tiên chưa sử dụng:

- Microservices
- CQRS
- Event Sourcing
- Message Broker
- Saga Pattern
- Generic Repository
- Base CRUD Service

Dự án ưu tiên cấu trúc rõ ràng, dễ kiểm thử và có khả năng mở rộng mà không thêm pattern chưa cần thiết.

---

## README Maintenance

Mỗi khi thay đổi một trong các nội dung sau, cần cập nhật lại `README.md`:

- Thêm hoặc xóa tech stack.
- Thêm module mới.
- Thay đổi cấu trúc thư mục.
- Thay đổi URL API.
- Thay đổi đường dẫn Swagger.
- Thay đổi biến môi trường.
- Thêm dịch vụ bên ngoài.
- Thay đổi quan hệ dữ liệu.
- Thay đổi cách chạy hoặc build dự án.

Không nên liệt kê công nghệ trong README chỉ vì package đã được cài. Tech stack chỉ nên ghi những công nghệ thực sự được dự án sử dụng.
