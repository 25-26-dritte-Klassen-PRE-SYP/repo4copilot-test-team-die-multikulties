# Technischer Entwurf – Multilingo App

# 1. Systemarchitektur

Die **Multilingo-App** wird als verteiltes System umgesetzt, das aus einem mobilen Frontend, einem serverseitigen Backend sowie einer persistenten Datenhaltung besteht.  
Die Architektur folgt einem klar getrennten **Schichtenmodell**, um Wartbarkeit, Erweiterbarkeit und Stabilität sicherzustellen.

Das System kommuniziert über standardisierte **HTTP-Schnittstellen**, die im Backend bereitgestellt werden. Alle Daten werden zentral verarbeitet, validiert und gespeichert, sodass sowohl Kursleiter als auch Kursteilnehmer jederzeit konsistente und aktuelle Informationen erhalten.

---

# 2. Frontend-Architektur

Das Frontend wird als mobile Anwendung für **iOS** und **Android** entwickelt.

Die App stellt eine **rollenbasierte Benutzeroberfläche** bereit, die abhängig vom eingeloggten Benutzer unterschiedliche Funktionen freischaltet.

## Eigenschaften des Frontends

- Komponentenbasierte Benutzeroberfläche
- Wiederverwendbare UI-Elemente
- Erweiterbare Architektur
- Kommunikation ausschließlich über REST-Endpunkte
- Token-basierte Authentifizierung
- Lokale Zwischenspeicherung zur Performance-Optimierung

Die App kommuniziert ausschließlich mit dem Backend und verarbeitet keine direkten Datenbankzugriffe.

---

# 3. Backend-Architektur

Das Backend bildet die zentrale Geschäftslogik der Anwendung.

Es verarbeitet sämtliche Anfragen des Frontends, führt Validierungen durch und steuert alle Datenflüsse innerhalb des Systems.

## Architekturmerkmale

- Modulare Struktur
- Trennung der Funktionsbereiche
- REST-API als Kommunikationsschnittstelle
- Sichere Authentifizierung über dedizierten Auth-Service

## Zentrale Module

### Benutzerverwaltung
Verwaltung von Benutzern, Rollen und Authentifizierungsdaten.

### Kursverwaltung
Erstellung, Bearbeitung und Verwaltung von Sprachkursen.

### Bewertungslogik
Speicherung und Verarbeitung von Bewertungen und Feedback.

## REST-API

Die REST-API stellt CRUD-Operationen für folgende Bereiche bereit:

- Benutzer
- Kurse
- Kurszuordnungen
- Bewertungen
- Preisinformationen

Die Authentifizierung erfolgt über token-basierte Verfahren zur sicheren Sitzungsverwaltung.

---

# 4. Datenbank-Design

Die Datenbank speichert alle relevanten Informationen dauerhaft und konsistent.

Es wird ein **relationales Datenbanksystem** verwendet, um eindeutige Beziehungen zwischen den einzelnen Entitäten sicherzustellen.

## Zentrale Entitäten

### Benutzer
Speichert persönliche Daten, Rollen und Login-Informationen.

### Kurse
Enthält Informationen zu Sprachkursen, Beschreibungen und Preisen.

### Kurszuordnungen
Verbindet Teilnehmer mit Kursen.

### Bewertungen
Speichert Bewertungen und Feedback zu Kursen.

### Preisinformationen
Verwaltet Kurskosten und Zahlungsinformationen.

## Datenbankeigenschaften

- Eindeutige Identifikatoren pro Datensatz
- Klare Beziehungen zwischen Tabellen
- Unterstützung mehrerer Kurse pro Benutzer
- Unterstützung mehrerer Teilnehmer pro Kurs
- Konsistente und nachvollziehbare Datenhaltung

Die Datenbank stellt sicher, dass sämtliche Informationen jederzeit abrufbar und eindeutig zuordenbar sind.

---

# 5. Systemkontext

Das System interagiert mit zwei Hauptakteuren:

- Kursleitern
- Kursteilnehmern

Beide greifen über die mobile App auf das Backend zu.

## Kommunikationsstruktur

```text
Kursleiter / Kursteilnehmer
            ↓
        Mobile App
            ↓
          Backend
            ↓
         Datenbank
```

Das Backend kommuniziert ausschließlich mit der Datenbank und stellt sämtliche benötigten Informationen bereit.

Externe Systeme werden im aktuellen technischen Entwurf nicht angebunden.

Die bestehenden Diagramme aus dem IST-Kontext bleiben unverändert und bilden weiterhin die Grundlage für den technischen Aufbau.
