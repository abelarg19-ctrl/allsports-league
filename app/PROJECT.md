# AllSports League
Version: v0.15-alpha
Status: Stable
Last Updated: July 2026

---

# Project Overview

AllSports League (ASL) is a sports tournament management platform built with Next.js 16, React 19, TypeScript and Supabase.

The goal is to provide a complete platform for managing:

- Tournaments
- Teams
- Players
- Fixtures
- Results
- Standings
- Dashboard
- Authentication
- Public Pages
- Playoffs
- Statistics

---

# Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- TailwindCSS
- Base UI
- Lucide Icons
- Supabase
- Supabase Auth
- Supabase Storage

---

# Architecture

app/
components/
features/
services/
lib/
public/

Every new feature should live inside features/.

Services are responsible for Supabase.

Pages only orchestrate components.

---

# Current Modules

## Authentication

✅ Login

✅ Signup

✅ Forgot Password

✅ Reset Password

---

## Dashboard

✅ Stats Cards

✅ Latest Results

✅ Upcoming Matches

✅ Recent Activity

---

## Teams

✅ CRUD

✅ Logo Upload

✅ Banner Upload

✅ Team Header

✅ Team Members

---

## Players

✅ CRUD

✅ Avatar Upload

✅ Team Players

---

## Tournaments

✅ CRUD

✅ Register Teams

✅ Fixtures Generator

✅ Tournament Details

---

## Matches

✅ Generate Fixtures

✅ Enter Results

✅ Match Result Dialog

---

## Standings

✅ Automatic calculation

✅ Dynamic table

---

# Current Sprint

ASL-015

Current objective:

Replace all Team IDs with real team information.

Show:

- Team name
- Team logo
- Team statistics

Never display:

Team #1

Team #2

Unknown Team

Loading...

---

# Build Status

npm run build

✅ Compiles successfully

TypeScript

✅ No errors

---

# Coding Rules

Always preserve architecture.

Never rewrite working modules unnecessarily.

One sprint at a time.

Maximum one file replacement per response.

Always return COMPLETE files.

Never return partial code unless explicitly requested.

Every file delivered must compile.

Always run:

npm run build

after every sprint.

---

# Next Sprints

ASL-015
Improve TeamService
Real team information everywhere

ASL-016
Public Team Profile

ASL-017
Public Player Profile

ASL-018
Tournament Public Page

ASL-019
Playoffs

ASL-020
Player Statistics

ASL-021
Tournament Statistics

ASL-022
Notifications

ASL-023
Admin Panel

ASL-024
Deployment

---

Current Stability

9.5 / 10

Architecture

Stable

Production Ready

Approximately 90%