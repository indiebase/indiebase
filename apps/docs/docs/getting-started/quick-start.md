---
title: Quick Start
description: Start your Server and first Package in under 10 minutes!
sidebar_position: 1
tags: [scripting]
---

Start a server and create your first Package in less than 10 minutes!

## Introduction

Welcome to the nanos world **Quick Start** guide! After going through this guide, you will learn:

1. How to setup and join your **Server**
2. How to create a simple **Package** with basic scripts
3. How to **Spawn Props** and **Entities** through scripting
4. How to subscribe to **Game Events**
5. How to Possess a Character

:::tip

This tutorial is for those who have never used nanos world server before and want to get started quickly!

:::

## Step 1: Download the Server

To start, you need to download the nanos world server. There are **three** options to do so:

1. Use the executable at `nanos-world/Server/NanosWorldServer.exe` _(in the base game installation folder)_.
2. Use SteamCMD to [download nanos world™ Dedicated Server](/docs/core-concepts/server-manual/server-installation).
3. Download the **nanos world™ Dedicated Server** tool from Steam Client.

## Step 2: Creating a Basic Package

After downloading the server, let's create a basic **Package**. A Package is a collection of Lua scripts that are executed on Client or Server to interact with the game.

To create a new Package, lets use the handy CLI tool to speed up the process. Open a terminal in your server folder and run the following command:
