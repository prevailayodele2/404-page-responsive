#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_log::Builder::default()
      .level(if cfg!(debug_assertions) { log::LevelFilter::Info } else { log::LevelFilter::Warn })
      .build())
    .invoke_handler(tauri::generate_handler![open_settings_window])
    .setup(|app| {
      // Create system tray
      let tray = tauri::tray::TrayIconBuilder::with_id("edith_tray")
        .icon(app.default_window_icon().cloned())
        .menu(&{
          let mut m = tauri::menu::Menu::new(app).unwrap();
          let _ = m.append(&tauri::menu::MenuItem::with_id(app, "show_hide", "Show/Hide", true, None::<&str>).unwrap());
          let _ = m.append(&tauri::menu::MenuItem::with_id(app, "pause_monitoring", "Pause Monitoring", true, None::<&str>).unwrap());
          let _ = m.append(&tauri::menu::MenuItem::with_id(app, "dnd_30m", "Do Not Disturb (30m)", true, None::<&str>).unwrap());
          let _ = m.append(&tauri::menu::MenuItem::with_id(app, "open_web", "Open Web Chat", true, None::<&str>).unwrap());
          let _ = m.append(&tauri::menu::MenuItem::with_id(app, "settings", "Settings", true, None::<&str>).unwrap());
          let _ = m.append(&tauri::menu::MenuItem::with_id(app, "quit", "Quit", true, None::<&str>).unwrap());
          m
        })
        .on_menu_event(|app, event| {
          match event.id().as_ref() {
            "quit" => { app.app_handle().exit(0); }
            "settings" => {
              let _ = tauri::WebviewWindowBuilder::new(app, "settings", tauri::WebviewUrl::App("/settings".into()))
                .title("Settings")
                .build();
            }
            "open_web" => {
              let _ = app.shell().open("http://localhost:5173/", None);
            }
            "show_hide" => {
              if let Some(w) = app.get_webview_window("widget") { let _ = w.toggle_minimized(); }
            }
            _ => {}
          }
        })
        .build(app)?;

      tray.set_visible(true)?;

      // Create floating widget window anchored bottom-right
      let _ = tauri::WebviewWindowBuilder::new(app, "widget", tauri::WebviewUrl::App("/".into()))
        .title("EDITH")
        .decorations(false)
        .transparent(true)
        .always_on_top(false)
        .shadow(true)
        .resizable(false)
        .inner_size(420.0, 320.0)
        .visible(true)
        .skip_taskbar(true)
        .build();
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn open_settings_window(app: tauri::AppHandle) {
  if app.get_webview_window("settings").is_none() {
    let _ = tauri::WebviewWindowBuilder::new(&app, "settings", tauri::WebviewUrl::App("/settings".into()))
      .title("Settings")
      .build();
  } else if let Some(w) = app.get_webview_window("settings") {
    let _ = w.set_focus();
  }
}
