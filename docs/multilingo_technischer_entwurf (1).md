# Technischer Entwurf: Multilingo

## 1. Einleitung und Zielsetzung

Die App **Multilingo** ist eine digitale Lösung zur Verwaltung von Sprachkursen, Kursleitern und Kursteilnehmern. Sie ersetzt den bisherigen papierbasierten Zustand durch ein strukturiertes, zentrales Softwaresystem.  
Im Ist‑Zustand „verwaltet der Kunde seine Sprachkurse momentan auf Papier, er möchte das digitalisieren.“   
Die Lösung fokussiert sich auf eine klare Trennung von Frontend, Backend und Datenhaltung, um eine stabile und erweiterbare technische Basis zu schaffen.

---

## 2. Systemarchitektur

Die Architektur von Multilingo folgt einem **Mobile‑First‑Ansatz mit zentralem Backend**:

- **Frontend (Mobile App):** Eine mobile Anwendung für iOS und Android, die als primäre Benutzerschnittstelle dient. Die App ist rollenbasiert aufgebaut und stellt unterschiedliche Oberflächen für Kursleiter und Kursteilnehmer bereit.
- **Backend (Server‑Anwendung):** Ein zentraler Server, der die Geschäftslogik kapselt, Anfragen der App verarbeitet und Datenzugriffe koordiniert. Die Kommunikation erfolgt über eine REST‑API auf Basis von HTTPS.
- **Persistenz (Datenbank):** Eine relationale Datenbank, in der Benutzer, Kurse, Kurszuordnungen, Bewertungen und Preisinformationen dauerhaft gespeichert werden.

Das System ist klar abgegrenzt: Kursleiter und Kursteilnehmer greifen über die App auf das Backend zu, das wiederum ausschließlich mit der Datenbank kommuniziert. Externe Systeme werden im aktuellen Entwurf nicht angebunden.  
Im technischen Entwurf ist festgehalten: „Das System interagiert mit zwei Hauptakteuren: Kursleitern und Kursteilnehmern. Beide greifen über die mobile App auf das Backend zu.“   

---

## 3. Datenmodell (Entity‑Relationship)

Zur Abbildung der fachlichen Kernobjekte wird ein relationales Datenmodell verwendet. Die wichtigsten Entitäten sind:

- **Benutzer (User):** Repräsentiert Kursleiter und Kursteilnehmer. Attribute umfassen u. a. Identifikator, Name, Login‑Daten und Rolleninformation.
- **Kurs (Course):** Beschreibt einen Sprachkurs mit Attributen wie Kurs‑ID, Sprache, Niveau (z. B. A1–C2), Kursleiter‑Referenz, Preis und Kursparametern.
- **Kurszuordnung (CourseEnrollment):** Verknüpft Benutzer mit Kursen und speichert z. B. Beitrittsdatum und aktuelles Sprachniveau im jeweiligen Kurs.
- **Bewertung (Assessment):** Hält Bewertungen bzw. Niveau‑Anpassungen eines Teilnehmers in einem Kurs fest.
- **Preisinformation (Pricing):** Speichert Preismodelle für Einzel‑ und Gruppenunterricht sowie die zugehörigen Einheiten (z. B. 90 Minuten).

Die Beziehungen sind so gestaltet, dass ein Benutzer mehreren Kursen zugeordnet werden kann und ein Kurs mehrere Teilnehmer haben kann. Bewertungen sind jeweils einem Kurs und einem Teilnehmer zugeordnet.  
Im ursprünglichen Entwurf wird beschrieben: „Zentrale Entitäten sind Benutzer, Kurse, Kurszuordnungen, Bewertungen und Preisinformationen.“   

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

## 5. Technische Systemqualitäten (nicht‑funktionale Aspekte – technisch formuliert)

Die folgenden Punkte beschreiben technische Eigenschaften der Lösung, ohne sie als Anforderungen zu formulieren:

### 5.1 Benutzbarkeit (technische Perspektive)

Die Benutzeroberfläche der mobilen App ist so aufgebaut, dass zentrale Aktionen mit wenigen Interaktionen erreichbar sind. Die komponentenbasierte Struktur ermöglicht eine konsistente Darstellung und erleichtert Anpassungen.  
Die App ist für eine klare Trennung der Rollen ausgelegt, sodass Kursleiter und Kursteilnehmer jeweils nur die für sie relevanten Funktionen sehen.

### 5.2 Effizienz und Performance

Die Kommunikation zwischen App und Backend erfolgt über schlanke REST‑Endpunkte, die nur die notwendigen Daten übertragen. Lokale Zwischenspeicherung im Frontend reduziert wiederholte Anfragen und verbessert die Reaktionszeiten.  
Die Datenbank ist so strukturiert, dass häufige Lesezugriffe (z. B. Kursübersichten, Teilnehmerlisten) effizient ausgeführt werden können.

### 5.3 Sicherheit (technische Umsetzung)

Die Authentifizierung wird über einen dedizierten Auth‑Service realisiert, der Token‑basierte Verfahren (z. B. JWT) verwendet. Passwörter werden gehasht gespeichert, und alle Verbindungen zwischen App und Backend sind verschlüsselt.  
Im technischen Entwurf wird festgehalten: „Die Anwendung setzt auf moderne Sicherheitsmechanismen, um alle gespeicherten und übertragenen Daten zu schützen.“   

### 5.4 Wartbarkeit und Erweiterbarkeit

Die modulare Backend‑Architektur mit klar getrennten Funktionsbereichen (Benutzerverwaltung, Kursverwaltung, Bewertungslogik) erleichtert spätere Erweiterungen. Neue Funktionen können als zusätzliche Module oder Endpunkte ergänzt werden, ohne bestehende Komponenten stark zu verändern.  
Die Trennung von Präsentationsschicht, Logikschicht und Datenzugriffsschicht unterstützt eine saubere Strukturierung des Codes und vereinfacht Analyse und Fehlerbehebung.

---

## 6. Technologie‑Stack (technische Festlegung)

Für die Umsetzung von Multilingo wird ein moderner Technologie‑Stack verwendet:

| Bereich | Technologie |
|---|---|
| Mobile Frontend | Flutter |
| Backend | Node.js |
| Datenbank | PostgreSQL |
| Authentifizierung | JWT |

Diese Kombination ermöglicht eine plattformübergreifende mobile App, ein performantes Backend und eine robuste relationale Datenhaltung.  
Im technischen Entwurf ist bereits festgelegt: „Frontend \| Flutter – Backend \| Node.js – Datenbank \| PostgreSQL – Authentifizierung \| JWT (JSON Web Token).“
