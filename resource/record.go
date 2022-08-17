package resource

import (
	"strconv"

	"github.com/manyminds/api2go"
	"github.com/sfcclip/connect/model"
	"xorm.io/xorm"
)

// RecordResource provides routing for records
type RecordResource struct {
	orm *xorm.Engine
}

// NewRecordResource returns new RecordResource
func NewRecordResource(orm *xorm.Engine) *RecordResource {
	return &RecordResource{orm}
}

// PaginatedFindAll to satisfy api2go data source interface
func (r RecordResource) PaginatedFindAll(req api2go.Request) (uint, api2go.Responder, error) {
	var records []model.Record
	limit, err := strconv.Atoi(req.Pagination["limit"])
	offset, err := strconv.Atoi(req.Pagination["offset"])
	count, err := r.orm.Count(model.Record{})
	if err != nil {
		return 0, &Response{}, err
	}

	if err := r.orm.Where("id BETWEEN ? AND ?", offset + 1, offset + limit).OrderBy("id").Find(&records); err != nil {
		return 0, &Response{}, err
	}

	return uint(count), &Response{Res: records}, nil
}

// FindOne to satisfy `api2go.DataSource` interface
// this method should return the user with the given ID, otherwise an error
func (r RecordResource) FindOne(ID string, req api2go.Request) (api2go.Responder, error) {
	id, err := strconv.ParseInt(ID, 10, 0)
	if err != nil {
		return &Response{}, err
	}
	record := model.Record{ID: id}
	if _, err := r.orm.Get(&record); err != nil {
		return &Response{}, err
	}
	return &Response{Res: record}, nil
}
