package models

type Jurusan struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	NamaJurusan string `json:"nama_jurusan"`
	Fakultas    string `json:"fakultas"`
	Jenjang     string `json:"jenjang"`
}
