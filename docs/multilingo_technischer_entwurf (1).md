# Technischer Entwurf: Multilingo

## 1. Einleitung und Zielsetzung

Die App **Multilingo** ist eine digitale Lösung zur Verwaltung von Sprachkursen, Kursleitern und Kursteilnehmern. Sie ersetzt den bisherigen papierbasierten Zustand durch ein strukturiertes, zentrales Softwaresystem.  
Im Ist‑Zustand „verwaltet der Kunde seine Sprachkurse momentan auf Papier, er möchte das digitalisieren.“   
Die Lösung fokussiert sich auf eine klare Trennung von Frontend, Backend und Datenhaltung, um eine stabile und erweiterbare technische Basis zu schaffen.

---

## 2. Systemarchitektur

Die Architektur von Multilingo folgt nun einem Web‑First‑Ansatz mit zentralem Backend:

- **Frontend (Web‑Applikation):
Eine browserbasierte Web‑App, die auf allen gängigen Geräten (Desktop, Tablet, Smartphone) läuft.
Die Oberfläche ist rollenbasiert aufgebaut und stellt unterschiedliche Views für Kursleiter und Kursteilnehmer bereit.

- **Backend (Server‑Anwendung):** Ein zentraler Server, der die Geschäftslogik kapselt, Anfragen der App verarbeitet und Datenzugriffe koordiniert. Die Kommunikation erfolgt über eine REST‑API auf Basis von HTTPS.
- **Persistenz (Datenbank):** Eine relationale Datenbank, in der Benutzer, Kurse, Kurszuordnungen, Bewertungen und Preisinformationen dauerhaft gespeichert werden.

Das System ist klar abgegrenzt: Kursleiter und Kursteilnehmer greifen über die App auf das Backend zu, das wiederum ausschließlich mit der Datenbank kommuniziert. Externe Systeme werden im aktuellen Entwurf nicht angebunden.  
Im technischen Entwurf ist festgehalten: „Das System interagiert mit zwei Hauptakteuren: Kursleitern und Kursteilnehmern. Beide greifen über die mobile App auf das Backend zu.“   

---

## 3. Datenmodell (Entity‑Relationship)

# Entity-Relationship-Diagramm (ERD) - Sprachkursverwaltung

```
┌─────────────────┐
│     User        │
├─────────────────┤
│ PK user_id      │
│    name         │
│    login        │
│    role         │
└─────────────────┘
        │
        │ (1:N)
        │
    ┌───┴───┐
    │       │
    │       └──────────────────┐
    │                          │
    │                    ┌─────────────────────┐
    │                    │  CourseEnrollment   │
    │                    ├─────────────────────┤
    │                    │ PK enrollment_id    │
    │                    │ FK user_id          │
    │                    │ FK course_id        │
    │                    │    join_date        │
    │                    │    current_level    │
    │                    └─────────────────────┘
    │                          │
    │                          │ (N:1)
    │                          │
    │                    ┌─────────────────┐
    │                    │     Course      │
    │                    ├─────────────────┤
    │                    │ PK course_id    │
    │                    │ FK instructor_id│◄──────┐
    │                    │    language     │       │
    │                    │    level       │       │
    │                    │    price       │       │
    │                    │    parameters  │       │
    │                    └─────────────────┘       │
    │                          │                   │
    │                          │ (1:N)             │
    │                          │                   │
    │                    ┌─────────────────┐       │
    │                    │   Assessment    │       │
    │                    ├─────────────────┤       │
    │                    │ PK assess_id    │       │
    │                    │ FK user_id      │───────┤ (Kursleiter)
    │                    │ FK course_id    │       │
    │                    │    level        │       │
    │                    │    date         │       │
    │                    └─────────────────┘       │
    │                                              │
    └──────────────────────────────────────────────┘
         (Kursleiter/Instructor)

┌──────────────────────┐
│     Pricing          │
├──────────────────────┤
│ PK pricing_id        │
│    lesson_type       │
│    duration_minutes  │
│    price             │
│    model_type        │
└──────────────────────┘
        │
        │ (referenziert durch)
        │
    Course
```

## Beziehungen (Relationships)

| Entitäten | Kardinalität | Beschreibung |
|-----------|-------------|--------------|
| User ↔ Course | N:M | über CourseEnrollment |
| User ↔ CourseEnrollment | 1:N | Ein Benutzer kann mehreren Kursen beitreten |
| Course ↔ CourseEnrollment | 1:N | Ein Kurs hat mehrere Teilnehmer |
| User ↔ Assessment | 1:N | Ein Benutzer hat mehrere Bewertungen |
| Course ↔ Assessment | 1:N | Ein Kurs hat mehrere Bewertungen |
| User ↔ Course | 1:N | Ein Kursleiter unterrichtet mehrere Kurse |
| Course ↔ Pricing | N:1 | Ein Kurs verwendet ein Preismodell |

## Attributübersicht

### User
- **user_id** (PK) - Eindeutige Benutzer-ID
- **name** - Vollständiger Name
- **login** - Login-Daten
- **role** - Rolle (Kursleiter/Teilnehmer)

### Course
- **course_id** (PK) - Eindeutige Kurs-ID
- **instructor_id** (FK) - Verweis auf Kursleiter (User)
- **language** - Sprache
- **level** - Niveau (A1–C2)
- **price** - Preis
- **parameters** - Kursparameter

### CourseEnrollment
- **enrollment_id** (PK) - Eindeutige Enrollmentt-ID
- **user_id** (FK) - Verweis auf Benutzer
- **course_id** (FK) - Verweis auf Kurs
- **join_date** - Beitrittsdatum
- **current_level** - Aktuelles Sprachniveau

### Assessment
- **assess_id** (PK) - Eindeutige Bewertungs-ID
- **user_id** (FK) - Verweis auf Teilnehmer
- **course_id** (FK) - Verweis auf Kurs
- **level** - Bewertetes Niveau
- **date** - Bewertungsdatum

### Pricing
- **pricing_id** (PK) - Eindeutige Preis-ID
- **lesson_type** - Art des Unterrichts (Einzelunterricht/Gruppenunterricht)
- **duration_minutes** - Dauer (z. B. 90 Minuten)
- **price** - Preis
- **model_type** - Preismodell-Typ

---

## 4. Funktionale Kernkomponenten (Module – technisch beschrieben)

### 4.1 Modul: Benutzer‑ und Rollenverwaltung

Dieses Modul verwaltet Benutzerkonten und Rollen. Es stellt Funktionen zur Registrierung, Authentifizierung und Verwaltung von Accountdaten bereit. Die Rolleninformation steuert, welche Bereiche der App sichtbar und nutzbar sind (z. B. Kursverwaltung für Kursleiter, Kursübersicht für Teilnehmer).  
Die technische Umsetzung erfolgt über einen Auth‑Service im Backend und eine rollenbasierte Zugriffskontrolle auf API‑Endpunkte.

### 4.2 Modul: Kursverwaltung

Dieses Modul ist für die Verwaltung von Kursen zuständig. Es stellt Schnittstellen zur Erstellung, Bearbeitung und Löschung von Kursen bereit. Kursleiter können Kurse anlegen und verwalten, während Kursteilnehmer Kursinformationen abrufen und sich einschreiben können.  
Die REST‑API bietet CRUD‑Operationen für Kurse und Kurszuordnungen, die direkt mit den entsprechenden Datenbanktabellen verknüpft sind.

### 4.3 Modul: Teilnehmer‑ und Bewertungsverwaltung

Dieses Modul verwaltet die Zuordnung von Teilnehmern zu Kursen sowie deren Bewertungen. Kursleiter können das Sprachniveau eines Teilnehmers pro Kurs anpassen und Bewertungen speichern.  
Jede Bewertung wird in der Datenbank persistiert und ist pro Kurs abrufbar. Die Logik zur Aktualisierung des Niveaus ist im Backend gekapselt und wird über dedizierte Endpunkte angesteuert.

### 4.4 Modul: Kursübersicht und Kursinformationen

Dieses Modul stellt den Kursteilnehmern eine Übersicht über ihre Kurse und die zugehörigen Kursinformationen bereit. Dazu gehören u. a. Preis, Datum und Niveau.  
Die App ruft diese Informationen über optimierte Lese‑Endpunkte ab, die die relevanten Daten aggregiert aus der Datenbank liefern.

---

## 5. Technologie‑Stack (technische Festlegung)

Für die Umsetzung von Multilingo wird ein moderner Technologie‑Stack verwendet:

| Bereich | Technologie |
|---|---|
| Web Frontend | React |
| Backend | Node.js |
| Datenbank | PostgreSQL |
| Authentifizierung | JWT |

Diese Kombination ermöglicht eine plattformübergreifende mobile App, ein performantes Backend und eine robuste relationale Datenhaltung.  
Im technischen Entwurf ist bereits festgelegt: „Frontend \| REact – Backend \| Node.js – Datenbank \| PostgreSQL – Authentifizierung \| JWT (JSON Web Token).“
