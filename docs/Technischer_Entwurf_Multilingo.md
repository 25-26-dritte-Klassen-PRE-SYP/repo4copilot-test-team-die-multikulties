# TECHNISCHER ENTWURF – MULTILINGO APP

---

# 1. SYSTEMARCHITEKTUR

Die Multilingo‑App wird als verteiltes System umgesetzt, das aus einem mobilen Frontend, einem serverseitigen Backend und einer persistenten Datenhaltung besteht. Die Architektur folgt einem klar getrennten Schichtenmodell, um Wartbarkeit, Erweiterbarkeit und Stabilität sicherzustellen. Das System kommuniziert über standardisierte HTTP‑Schnittstellen, die im Backend bereitgestellt werden. Alle Daten werden zentral verarbeitet, validiert und gespeichert, sodass sowohl Kursleiter als auch Kursteilnehmer konsistente und aktuelle Informationen erhalten.

---

# 2. FRONTEND‑ARCHITEKTUR

Das Frontend wird als mobile Anwendung für iOS und Android entwickelt. Die App stellt eine rollenbasierte Benutzeroberfläche bereit, die abhängig vom eingeloggten Benutzer unterschiedliche Funktionen freischaltet. Die Darstellung erfolgt komponentenbasiert, sodass UI‑Elemente wiederverwendbar und leicht erweiterbar sind. Die App kommuniziert ausschließlich über REST‑Endpunkte mit dem Backend. Authentifizierte Sitzungen werden über Token‑basierte Mechanismen verwaltet. Lokale Zwischenspeicherungen verbessern die Performance und reduzieren Ladezeiten.

---

# 3. BACKEND‑ARCHITEKTUR

Das Backend stellt die zentrale Geschäftslogik der Anwendung bereit. Es verarbeitet Anfragen des Frontends, führt Validierungen durch und steuert sämtliche Datenflüsse. Die Architektur ist modular aufgebaut, sodass Funktionsbereiche wie Benutzerverwaltung, Kursverwaltung und Bewertungslogik klar voneinander getrennt sind. Die REST‑API bildet die Kommunikationsschnittstelle zwischen Frontend und Backend. Alle Endpunkte sind so strukturiert, dass sie CRUD‑Operationen für Benutzer, Kurse, Kurszuordnungen und Bewertungen ermöglichen. Die Authentifizierung erfolgt über einen dedizierten Auth‑Service, der sichere Login‑ und Registrierungsprozesse bereitstellt.

---

# 4. DATENBANK‑DESIGN

Die Datenbank speichert alle relevanten Informationen dauerhaft. Sie ist relational aufgebaut, um konsistente Beziehungen zwischen Benutzern, Kurse, Kurszuordnungen und Bewertungen sicherzustellen. Zentrale Entitäten sind Benutzer, Kurse, Kurszuordnungen, Bewertungen und Preisinformationen. Jede Entität besitzt eindeutige Identifikatoren und klar definierte Beziehungen zu anderen Tabellen. Die Struktur ermöglicht es, mehrere Kurse pro Benutzer sowie mehrere Teilnehmer pro Kurs abzubilden. Die Datenbank stellt sicher, dass alle gespeicherten Informationen jederzeit abrufbar und eindeutig zuordenbar sind.

---

# 5. SYSTEMKONTEXT

Das System interagiert mit zwei Hauptakteuren: Kursleitern und Kursteilnehmern. Beide greifen über die mobile App auf das Backend zu. Das Backend kommuniziert ausschließlich mit der Datenbank und stellt alle benötigten Informationen bereit. Externe Systeme werden im aktuellen Entwurf nicht angebunden. Die bestehenden Diagramme aus dem IST‑Kontext bleiben unverändert und bilden weiterhin die Grundlage für den technischen Aufbau.

---

# 6. Sicherheitsaskepte

- Passwort-Hashing zur sicheren Speicherung von Benutzerpasswörtern
- HTTPS‑Verschlüsselung für sichere Datenübertragung
- JWT‑basierte Authentifizierung
- Rollenbasierte Zugriffsrechte für Kursleiter und Teilnehmer
- Eingabevalidierung zur Vermeidung fehlerhafter oder schädlicher Daten

---

# 7. Verwendete Technologien

| Bereich | Technologie |
|---|---|
| Frontend | Flutter |
| Backend | Node.js |
| Datenbank | PostgreSQL |
| Authentifizierung | JWT (JSON Web Token) |
