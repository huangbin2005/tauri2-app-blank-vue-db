/**
 * 自定义托盘图标
 */
use tauri::{
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Emitter, Manager, Runtime,
};

pub fn tray_create<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    let _ = TrayIconBuilder::with_id("tray")
        .tooltip("tauri_blank")
        .icon(app.default_window_icon().unwrap().clone())
        .on_tray_icon_event(|tray, event| match event {
            TrayIconEvent::Click {
                id: _,
                position,
                rect: _,
                button,
                button_state: _,
            } => match button {
                MouseButton::Left {} => {
                    let windows = tray.app_handle().webview_windows();
                    for (key, value) in windows {
                        println!("点击左键: {}", key);
                        if key == "main-login" || key == "main" {
                            value.show().unwrap();
                            value.unminimize().unwrap();
                            value.set_focus().unwrap();
                        }
                    }
                }
                MouseButton::Right {} => {
                    println!("点击右键");
                    tray.app_handle()
                        .emit("tray_contextmenu", position)
                        .unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .build(app);
    Ok(())
}
