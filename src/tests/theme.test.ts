import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useTheme from "../components/theme";

describe("theme test", () => {
  test("starts with default theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme.background).toBe("#FFF");
  });

  test("toggles theme", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme.background).toBe("#000");
  });

  test("saves theme to local storage", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    const theme = localStorage.getItem("theme-preferences");
    const parsedTheme = JSON.parse(theme || '{}');
    const includes = parsedTheme.state.theme.background ==="#FFF" ? true : false;
    expect(includes).toBe(true);
  });

});



  